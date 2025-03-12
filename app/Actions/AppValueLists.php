<?php

namespace App\Actions;

use App\Models\Genre;
use App\Models\Keyword;
use App\Models\ProductionCountry;
use App\Models\Title;
use Common\Core\Values\ValueLists;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AppValueLists extends ValueLists
{
    public function titleFilterLanguages($params = [])
    {
        $allLanguages = json_decode(
            $this->fs->get(base_path('resources/lists/tmdb-languages.json')),
            true,
        );

        $usedLanguages = Title::withoutGlobalScope('adult')
            ->select('language')
            ->groupBy('language')
            ->select([DB::raw('count(*) as total'), 'language'])
            ->pluck('total', 'language')
            ->toArray();

        return collect($allLanguages)
            ->filter(fn($language) => isset($usedLanguages[$language['code']]))
            ->map(
                fn($language) => [
                    'value' => $language['code'],
                    'name' => $language['name'],
                    'total' => $usedLanguages[$language['code']] ?? 0,
                ],
            )
            ->sortByDesc('total')
            ->values();
    }

    public function productionCountries($params = []): Collection
    {
        return ProductionCountry::get(['id', 'name', 'display_name'])->map(
            fn($country) => [
                'value' => $country->id,
                'name' => $country->display_name,
            ],
        );
    }

    public function genres($params = []): Collection
    {
        if (Arr::get($params, 'type') === 'tmdb') {
            $genres = json_decode(
                $this->fs->get(resource_path('lists/tmdb-genres.json')),
                true,
            );
            return collect($genres)->map(
                fn($genre) => [
                    'value' => $genre['id'],
                    'name' => $genre['name'],
                ],
            );
        } else {
            return Genre::get(['id', 'name', 'display_name'])->map(
                fn($genre) => [
                    'value' => $genre->id,
                    'name' => $genre->display_name,
                ],
            );
        }
    }

    public function languages($params = [])
    {
        if (Arr::get($params, 'type') === 'tmdb') {
            return collect(
                json_decode(
                    $this->fs->get(resource_path('lists/tmdb-languages.json')),
                    true,
                ),
            );
        } else {
            return parent::languages();
        }
    }

    public function countries($params = [])
    {
        if (Arr::get($params, 'type') === 'tmdb') {
            return collect(
                json_decode(
                    $this->fs->get(resource_path('lists/tmdb-countries.json')),
                    true,
                ),
            );
        } else {
            return parent::countries();
        }
    }

    public function keywords($params = [])
    {
        if (Arr::get($params, 'type') === 'tmdb') {
            $allKeywords = collect(
                json_decode(
                    $this->fs->get(resource_path('lists/tmdb-keywords.json')),
                    true,
                ),
            );

            if (isset($params['searchQuery'])) {
                $allKeywords = $allKeywords
                    ->filter(
                        fn($keyword) => str_contains(
                            strtolower($keyword['name']),
                            strtolower($params['searchQuery']),
                        ),
                    )
                    ->values();
            }

            $keywords = $allKeywords->slice(0, 50)->map(
                fn($keyword) => [
                    'value' => $keyword['id'],
                    'name' => $keyword['name'],
                ],
            );

            $selectedIds = Arr::get($params, 'selectedValue');
            if (!empty($selectedIds)) {
                $selectedKeywords = $allKeywords
                    ->whereIn('id', explode(',', $selectedIds))
                    ->map(
                        fn($keyword) => [
                            'value' => $keyword['id'],
                            'name' => $keyword['name'],
                        ],
                    );
                if ($selectedKeywords->isNotEmpty()) {
                    $keywords = $selectedKeywords
                        ->merge($keywords)
                        ->unique('value');
                }
            }
        } else {
            $query = isset($params['searchQuery'])
                ? Keyword::search($params['searchQuery'])
                : Keyword::query();

            $keywords = $query
                ->take(50)
                ->get()
                ->map(
                    fn($keyword) => [
                        'value' => $keyword->id,
                        'name' => $keyword->display_name,
                    ],
                );

            if ($selectedValue = Arr::get($params, 'selectedValue')) {
                $selectedKeyword = Keyword::find($selectedValue);
                if ($selectedKeyword) {
                    $keywords->prepend([
                        'value' => $selectedKeyword->id,
                        'name' => $selectedKeyword->display_name,
                    ]);
                }
            }
        }

        return $keywords->values();
    }

    public function titleFilterAgeRatings($params = []): Collection
    {
        return Title::withoutGlobalScope('adult')
            ->select('certification')
            ->groupBy('certification')
            ->select([DB::raw('count(*) as total'), 'certification'])
            ->orderBy('total', 'desc')
            ->pluck('certification')
            ->filter(
                fn($certification) => !!$certification &&
                    $certification !== '-',
            )
            ->map(
                fn($certification) => [
                    'value' => $certification,
                    'name' => strtoupper($certification),
                ],
            )
            ->values();
    }
}
