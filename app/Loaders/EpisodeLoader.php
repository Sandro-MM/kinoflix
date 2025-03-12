<?php

namespace App\Loaders;

use App\Actions\Titles\TitleCredits;
use App\Models\Title;

class EpisodeLoader
{
    public function loadData(?string $loader): array
    {
        $pageName = request()->route('pageName');
        $title = Title::with('genres')->findOrFail(request()->route('titleId'));
        $season = $title->findSeason(request()->route('seasonNumber'));
        $episode = $season->findEpisode(request()->route('episodeNumber'));

        if (!$loader) {
            $loader =
                $pageName === 'full-credits'
                    ? 'episodeCreditsPage'
                    : 'episodePage';
        }

        if (
            ($loader === 'episodePage' || $loader === 'episodeCreditsPage') &&
            requestIsFromFrontend()
        ) {
            $season = $season->maybeUpdateFromExternal($title);
            if (!$season) {
                abort(404);
            }
        }

        $response = [
            'title' => $title,
            'episode' => $episode,
            'loader' => $loader,
        ];

        if ($loader === 'episodePage') {
            $episode->load(['videos', 'primaryVideo']);
            $response['credits'] = app(TitleCredits::class)->loadCompact(
                $title,
                $season,
                $episode,
            );
        }

        if ($loader === 'episodeCreditsPage') {
            $response['credits'] = app(TitleCredits::class)->loadFull(
                $title,
                $season,
                $episode,
            );
        }

        return $response;
    }
}
