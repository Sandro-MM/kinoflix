<?php

namespace App\Models;

use App\Actions\Titles\HandlesEncodedTmdbId;
use App\Actions\Titles\HasCreditableRelation;
use App\Actions\Titles\HasVideoRelation;
use App\Actions\Titles\InsertsTmdbTitleOrPerson;
use App\Actions\Titles\Store\StoreTitleData;
use App\Services\Data\Tmdb\TmdbApi;
use Carbon\Carbon;
use Common\Comments\Comment;
use Common\Core\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Arr;
use Laravel\Scout\Searchable;

class Title extends BaseModel
{
    use HasCreditableRelation,
        HasVideoRelation,
        Searchable,
        HandlesEncodedTmdbId,
        InsertsTmdbTitleOrPerson;

    public const MOVIE_TYPE = 'movie';
    public const SERIES_TYPE = 'series';
    public const MODEL_TYPE = 'title';

    protected $guarded = ['id', 'type'];
    protected $appends = [
        'rating',
        'model_type',
        'vote_count',
        'status',
        'year',
    ];

    public $hidden = [
        'imdb_rating',
        'imdb_votes_num',
        'tmdb_vote_average',
        'local_vote_average',
        'local_vote_count',
        'tmdb_vote_count',
        'mc_user_score',
        'mc_critic_score',
    ];

    protected $casts = [
        'id' => 'integer',
        'allow_update' => 'boolean',
        'series_ended' => 'boolean',
        'is_series' => 'boolean',
        'tmdb_vote_count' => 'integer',
        'runtime' => 'integer',
        'views' => 'integer',
        'popularity' => 'integer',
        'tmdb_vote_average' => 'float',
        'local_vote_average' => 'float',
        'fully_synced' => 'boolean',
        'adult' => 'boolean',
        'rating' => 'float',
        'vote_count' => 'integer',
        'seasons_count' => 'integer',
        'release_date' => 'date',
    ];

    protected static function booted()
    {
        static::addGlobalScope('adult', function (Builder $builder) {
            if (!config('tmdb.includeAdult')) {
                $builder->where('adult', false);
            }
        });
    }

    public function findSeason(int $number): Season
    {
        return $this->seasons()
            ->where('number', $number)
            ->firstOrFail();
    }

    public function findEpisode(int $season, int $episode): Episode
    {
        return $this->episodes()
            ->where('season_number', $season)
            ->where('episode_number', $episode)
            ->firstOrFail();
    }

    public function maybeUpdateFromExternal(array $options = []): static|null
    {
        $tmdbImportingIsEnabled =
            settings('content.title_provider') === 'tmdb' ||
            Arr::get($options, 'forceAutomation');
        $needsUpdating = $this->needsUpdating(
            $options['ignoreLastUpdate'] ?? false,
        );

        // first update title itself, if needed
        if ($tmdbImportingIsEnabled && $needsUpdating) {
            $data = app(TmdbApi::class)->getTitle($this);
            if (!$data) {
                return null;
            }

            app(StoreTitleData::class)->execute($this, $data);
        }

        // then update 3 last seasons
        if (
            $needsUpdating &&
            $this->is_series &&
            Arr::get($options, 'updateLast3Seasons') &&
            (settings('content.force_season_update') || $tmdbImportingIsEnabled)
        ) {
            $this->seasons()
                ->orderBy('number', 'desc')
                ->take(3)
                ->get()
                ->each(
                    fn(Season $season) => $season->maybeUpdateFromExternal(
                        $this,
                        $options,
                    ),
                );
        }

        return $this;
    }

    protected function needsUpdating($force = false): bool
    {
        if (!$this->tmdb_id || !$this->exists) {
            return false;
        }

        if ($force) {
            return true;
        }

        // only partial data was fetched
        if (
            is_null($this->release_date) ||
            (is_null($this->runtime) &&
                is_null($this->revenue) &&
                is_null($this->country) &&
                is_null($this->budget) &&
                is_null($this->imdb_id))
        ) {
            return true;
        }

        // sync every week
        return $this->allow_update &&
            $this->updated_at->lessThan(Carbon::now()->subWeek());
    }

    public static function firstOrCreateFromEncodedTmdbId(
        string $encodedId,
        bool $create = true,
    ): static {
        [$tmdbId, $type] = static::decodeTmdbIdOrFail($encodedId);

        if (!$tmdbId || !$type) {
            throw new ModelNotFoundException();
        }

        $title = static::withoutGlobalScope('adult')
            ->where([
                'tmdb_id' => $tmdbId,
                'is_series' => $type === Title::SERIES_TYPE,
            ])
            ->first();

        if (!$title && $create) {
            $title = static::create([
                'tmdb_id' => $tmdbId,
                'is_series' => $type === Title::SERIES_TYPE,
            ]);
        }

        if (!$title) {
            throw new ModelNotFoundException();
        }

        return $title;
    }

    protected function rating(): Attribute
    {
        return Attribute::make(
            get: function () {
                return (float) Arr::get(
                    $this->attributes,
                    config('common.site.rating_column'),
                );
            },
        );
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->release_date?->isFuture()) {
                    return 'upcoming';
                } elseif ($this->is_series) {
                    return $this->series_ended ? 'ended' : 'ongoing';
                } else {
                    return 'released';
                }
            },
        );
    }

    protected function voteCount(): Attribute
    {
        return Attribute::make(
            get: function () {
                $column = str_replace(
                    '_average',
                    '_count',
                    config('common.site.rating_column'),
                );
                return Arr::get($this->attributes, $column) ?: 0;
            },
        );
    }

    protected function year(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->release_date?->year;
            },
        );
    }

    public function plays(): HasManyThrough
    {
        return $this->hasManyThrough(VideoPlay::class, Video::class);
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    public function keywords(): BelongsToMany
    {
        return $this->belongsToMany(Keyword::class);
    }

    public function productionCountries(): BelongsToMany
    {
        return $this->belongsToMany(ProductionCountry::class, 'country_title');
    }

    public function scopeCompact(Builder $query): Builder
    {
        return $query->select([
            'titles.id',
            'titles.name',
            'titles.poster',
            'titles.backdrop',
        ]);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'model')
            ->select(['id', 'model_id', 'model_type', 'url', 'type', 'source'])
            ->orderBy('order', 'asc');
    }

    public function newsArticles(): MorphToMany
    {
        return $this->morphToMany(
            NewsArticle::class,
            'model',
            'news_article_models',
            'model_id',
            'article_id',
        )->orderBy('created_at', 'desc');
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')
            ->orderBy('created_at', 'desc')
            ->orderByWeightedScore();
    }

    public function seasons(): HasMany
    {
        return $this->hasMany(Season::class);
    }

    public function season(): HasOne
    {
        return $this->hasOne(Season::class);
    }

    public function episodes(): HasMany
    {
        return $this->hasMany(Episode::class);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'original_title' => $this->original_title,
            'release_date' => $this->release_date,
            'popularity' => $this->popularity,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at', 'release_date', 'popularity'];
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->release_date?->format('Y'),
            'image' => $this->poster
                ? preg_replace('/original|w1280/', 'w92', $this->poster)
                : null,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    public function resolveRouteBinding($value, $field = null): static
    {
        if (is_numeric($value) || ctype_digit($value)) {
            return $this->findOrFail($value);
        }

        [$tmdbId, $type] = static::decodeTmdbIdOrFail($value);

        if (!$tmdbId || !$type) {
            throw new ModelNotFoundException();
        }

        return static::where('tmdb_id', $tmdbId)
            ->where('is_series', $type === Title::SERIES_TYPE)
            ->firstOrFail();
    }
}
