<?php

namespace App\Models;

use App\Actions\Titles\HasCreditableRelation;
use App\Actions\Titles\HasVideoRelation;
use Common\Comments\Comment;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Arr;

class Episode extends Model
{
    use HasCreditableRelation, HasVideoRelation;

    public const MODEL_TYPE = 'episode';

    protected $guarded = ['id'];
    protected $appends = [
        'model_type',
        'rating',
        'vote_count',
        'status',
        'year',
    ];

    protected $casts = [
        'id' => 'integer',
        'episode_number' => 'integer',
        'season_number' => 'integer',
        'year' => 'integer',
        'title_id' => 'integer',
        'season_id' => 'integer',
        'allow_update' => 'boolean',
        'tmdb_vote_count' => 'integer',
        'tmdb_vote_average' => 'float',
        'popularity' => 'integer',
        'runtime' => 'integer',
        'rating' => 'float',
        'vote_count' => 'integer',
        'release_date' => 'date',
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

    protected function year(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->release_date?->year;
            },
        );
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->release_date?->isFuture()
                    ? 'upcoming'
                    : 'released';
            },
        );
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

    public function getRatingAttribute()
    {
        return Arr::get($this->attributes, config('common.site.rating_column'));
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

    public function title(): BelongsTo
    {
        return $this->belongsTo(Title::class);
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')->orderBy(
            'created_at',
            'desc',
        );
    }

    public function plays(): HasManyThrough
    {
        return $this->hasManyThrough(VideoPlay::class, Video::class);
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->relationLoaded('title')
                ? $this->title->name
                : null,
            'image' => $this->poster,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
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

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
