<?php

namespace App\Loaders;

use App\Actions\Titles\Retrieve\PaginateSeasonEpisodes;
use App\Actions\Titles\Retrieve\PaginateTitleSeasons;
use App\Actions\Titles\TitleCredits;
use App\Models\Title;
use Common\Core\Values\ValueLists;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Arr;

class TitleLoader
{
    public function loadData(?string $loader): array
    {
        $pageName = request()->route('pageName');
        $titleId = request()->route('id');

        if (!$loader) {
            $loader =
                $pageName === 'full-credits' ? 'titleCreditsPage' : 'titlePage';
        }

        if (is_numeric($titleId) || ctype_digit($titleId)) {
            $title = Title::findOrFail($titleId);
        } else {
            $title = Title::firstOrCreateFromEncodedTmdbId(
                $titleId,
                // only create new title if automation is enabled, otherwise blank titles will be left, if someone visits title via tmdb url version and automation is disabled
                create: settings('content.title_provider') === 'tmdb',
            );
        }

        if (
            ($loader === 'titlePage' || $loader === 'titleCreditsPage') &&
            requestIsFromFrontend()
        ) {
            $title = $title->maybeUpdateFromExternal();
            if (!$title) {
                abort(404);
            }
        }

        $response = [
            'title' => $title->loadCount('seasons'),
            'loader' => $loader,
        ];

        if ($title->language) {
            $lang = Arr::first(
                app(ValueLists::class)->languages(),
                fn($lang) => $lang['code'] === $title->language,
            );
            $response['language'] = $lang['name'] ?? null;
        }

        if ($loader === 'titlePage') {
            return $this->loadTitlePage($response);
        }
        if ($loader === 'titleCreditsPage') {
            return $this->loadTitleCreditsPage($response);
        }
        if ($loader === 'editTitlePage') {
            $title->load([
                'images',
                'genres',
                'keywords',
                'productionCountries',
            ]);
            return $response;
        }

        return $response;
    }

    private function loadTitlePage(array $response): array
    {
        $enabledSections = settings('title_page.sections');
        $title = $response['title'];
        $title->load([
            'images',
            'genres',
            'productionCountries',
            'keywords',
            'primaryVideo',
        ]);
        $response = $this->loadVideos($response);

        if (in_array('episodes', $enabledSections)) {
            $response['episodes'] = app(PaginateSeasonEpisodes::class)->execute(
                $title,
                1,
                request()->all(),
            );
        }

        if (in_array('seasons', $enabledSections)) {
            $response = $this->loadSeasons($response);
        }

        return $this->loadCompactCredits($response);
    }

    private function loadTitleCreditsPage(array $response): array
    {
        $title = $response['title'];
        $title->load(['genres', 'primaryVideo']);
        $response = $this->loadSeasons($response);
        $response = $this->loadVideos($response);
        return $this->loadCredits($response);
    }

    private function loadSeasons(array $response): array
    {
        if ($response['title']->is_series) {
            $response['seasons'] = app(PaginateTitleSeasons::class)->execute(
                $response['title'],
            );
        }
        return $response;
    }

    private function loadVideos(array $response): array
    {
        $response['title']->load([
            'videos' => function (HasMany $query) {
                $query
                    ->where('approved', true)
                    ->whereNull('episode_num')
                    ->fromConfiguredCategory();
            },
        ]);
        return $response;
    }

    private function loadCredits(array $response): array
    {
        $response['credits'] = app(TitleCredits::class)->loadFull(
            $response['title'],
        );
        return $response;
    }

    private function loadCompactCredits(array $response): array
    {
        $response['credits'] = app(TitleCredits::class)->loadCompact(
            $response['title'],
        );
        return $response;
    }
}
