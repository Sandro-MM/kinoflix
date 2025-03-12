<?php

namespace App\Http\Controllers;

use App\Actions\LocalSearch;
use App\Services\Data\Tmdb\TmdbApi;
use Common\Core\BaseController;
use Illuminate\Support\Collection;
use Str;

class SearchController extends BaseController
{
    public function index($query)
    {
        $dataProvider =
            request('provider') ?: settings('content.search_provider');
        $results = $this->searchUsing($dataProvider, $query)
            ->map(function ($result) {
                if (isset($result['description'])) {
                    $result['description'] = Str::limit(
                        $result['description'],
                        140,
                    );
                }
                return $result;
            })
            ->values();

        $data = [
            'results' => $results,
            'query' => trim(strip_tags($query), '"\''),
            'loader' => 'searchPage',
        ];

        return $this->renderClientOrApi([
            'pageName' => 'search-page',
            'data' => $data,
        ]);
    }

    private function searchUsing($provider, $query)
    {
        $params = request()->all();
        $params['limit'] =
            request('loader', 'searchPage') === 'searchPage' ? 20 : 8;

        if ($provider === 'tmdb') {
            return app(TmdbApi::class)->search($query, $params);
        }

        $results = app(LocalSearch::class)->execute($query, $params);

        if ($provider === 'all') {
            $tmdb = app(TmdbApi::class)->search($query, $params);
            $results = $results
                ->concat($tmdb)
                ->unique(
                    fn($item) => ($item['tmdb_id'] ?: $item['name']) .
                        $item['model_type'],
                )
                ->groupBy('model_type')
                // make sure specified limit is enforced per group
                // (title, person) instead of the whole collection
                ->map(
                    fn(Collection $group) => $group->slice(0, $params['limit']),
                )
                ->flatten(1)
                ->sortByDesc('popularity');
        }

        return $results;
    }
}
