<?php

namespace App\Loaders;

use App\Actions\Titles\Retrieve\PaginateSeasonEpisodes;
use App\Models\Title;
use App\Models\Video;

class SeasonLoader
{
    public function loadData(?string $loader): array
    {
        if (!$loader) {
            $loader = 'seasonPage';
        }

        $titleId = request()->route('titleId');
        $seasonNumber = request()->route('seasonNumber');

        $title = Title::withCount('seasons')->findOrFail($titleId);
        $season = $title->findSeason($seasonNumber);
        $season->loadCount('episodes');

        if ($loader === 'seasonPage' && requestIsFromFrontend()) {
            $season = $season->maybeUpdateFromExternal($title);
            if (!$season) {
                abort(404);
            }
        }

        $response = [
            'title' => $title,
            'season' => $season,
            'loader' => $loader,
        ];

        if ($loader === 'seasonPage' || $loader === 'editSeasonPage') {
            $response['episodes'] = app(PaginateSeasonEpisodes::class)->execute(
                $title,
                $seasonNumber,
                request()->all(),
            );
        }

        if ($loader === 'seasonPage') {
            $primaryVideo = Video::where('title_id', $season->title_id)
                ->select([
                    'id',
                    'title_id',
                    'name',
                    'category',
                    'episode_id',
                    'season_num',
                    'episode_num',
                ])
                ->where('season_num', $season->number)
                ->when(settings('streaming.prefer_full'), function ($query) {
                    $query->where('category', 'full');
                })
                ->applySelectedSort()
                ->first();
            $season->primary_video = $primaryVideo;
        }

        return $response;
    }
}
