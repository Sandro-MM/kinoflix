<?php

namespace App\Models;

use App\Actions\Titles\HasCreditableRelation;
use App\Actions\Titles\Store\StoreSeasonData;
use App\Services\Data\Tmdb\TmdbApi;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Arr;

class Season extends Model
{
    use HasCreditableRelation;

    public const MODEL_TYPE = 'season';

    protected $guarded = ['id'];
    protected $appends = ['model_type'];

    protected $casts = [
        'id' => 'integer',
        'fully_synced' => 'boolean',
        'episodes_count' => 'integer',
        'number' => 'integer',
        'release_date' => 'date',
    ];

    public function episodes(): HasMany
    {
        return $this->hasMany(Episode::class);
    }

    public function title(): BelongsTo
    {
        return $this->belongsTo(Title::class);
    }

    public function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    public function findEpisode(int $number): Episode|null
    {
        return $this->episodes()
            ->where('episode_number', $number)
            ->firstOrFail();
    }

    public function maybeUpdateFromExternal(
        Title $title,
        array $options = [],
    ): self {
        if ($this->needsUpdating($title, $options)) {
            $data = app(TmdbApi::class)->getSeason($title, $this->number);
            if ($data) {
                app(StoreSeasonData::class)->execute($title, $data);
                $this->refresh();
            }
        }
        return $this;
    }

    protected function needsUpdating(Title $title, array $options = []): bool
    {
        $isFullySynced = $options['forceAutomation'] ?? $this->fully_synced;
        $tmdbImportingIsEnabled =
            settings('content.title_provider') === 'tmdb' ||
            Arr::get($options, 'forceAutomation');

        if (!$this->exists || !$title->tmdb_id) {
            return false;
        }

        // series ended and this season is already fully updated from external site
        if ($title->series_ended && $isFullySynced) {
            return false;
        }

        // season is fully synced, and it's not the latest season
        if ($isFullySynced && $title->season_count > $this->number) {
            return false;
        }

        if (
            !$tmdbImportingIsEnabled &&
            // might need to fetch title seasons, even if automation is disabled because they can't be
            // fetched when importing multiple titles without hitting tmdb api rate limits
            !settings('content.force_season_update')
        ) {
            return false;
        }

        if (!$isFullySynced) {
            return true;
        }

        if (Arr::get($options, 'ignoreLastUpdate')) {
            return true;
        }

        return !$this->updated_at ||
            $this->updated_at->lessThan(Carbon::now()->subWeek());
    }
}
