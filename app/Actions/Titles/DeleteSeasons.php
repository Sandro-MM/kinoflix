<?php

namespace App\Actions\Titles;

use App\Models\Episode;
use App\Models\Season;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DeleteSeasons
{
    public function execute(array|Collection $seasonIds): void
    {
        // seasons
        DB::table('creditables')
            ->whereIn('creditable_id', $seasonIds)
            ->where('creditable_type', Season::MODEL_TYPE)
            ->delete();

        app(Season::class)
            ->whereIn('id', $seasonIds)
            ->delete();

        // episodes
        $episodeIds = app(Episode::class)
            ->whereIn('season_id', $seasonIds)
            ->pluck('id');

        DB::table('creditables')
            ->whereIn('creditable_id', $episodeIds)
            ->where('creditable_type', Episode::MODEL_TYPE)
            ->delete();

        app(Episode::class)
            ->whereIn('id', $episodeIds)
            ->delete();
    }
}
