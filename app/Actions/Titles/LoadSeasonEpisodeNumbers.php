<?php

namespace App\Actions\Titles;

use Illuminate\Support\Facades\DB;

class LoadSeasonEpisodeNumbers
{
    public function execute(int $titleId, int $seasonNumber): array
    {
        return DB::table('episodes')
            ->where('title_id', $titleId)
            ->where('season_number', $seasonNumber)
            ->orderBy('episode_number', 'asc')
            ->pluck('episode_number')
            ->toArray();
    }
}
