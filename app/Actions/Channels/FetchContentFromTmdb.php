<?php

namespace App\Actions\Channels;

use App\Models\Person;
use App\Models\Title;
use App\Services\Data\Tmdb\TmdbApi;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class FetchContentFromTmdb
{
    public function execute(
        string $method,
        string $modelType,
        ?array $filters = [],
    ): Collection {
        Title::disableSearchSyncing();
        Person::disableSearchSyncing();
        if ($modelType === Person::MODEL_TYPE) {
            return $this->importPeople($method);
        } else {
            return $this->ImportTitles($method, $modelType, $filters);
        }
    }

    protected function importPeople(string $method)
    {
        if ($method === 'trendingPeople') {
            $people = app(TmdbApi::class)->trendingPeople();
            return $people
                ->map(
                    fn($personData) => Person::firstOrCreateFromEncodedTmdbId(
                        $personData['id'],
                    )->maybeUpdateFromExternal([
                        'forceAutomation' => true,
                    ]),
                )
                ->filter();
        }
    }

    protected function ImportTitles(
        string $method,
        string $modelType,
        ?array $extraFilters = [],
    ) {
        $filters = $this->buildFilters($method, $modelType);

        if (count($extraFilters)) {
            if (isset($extraFilters['keyword'])) {
                $filters['with_keywords'] = $extraFilters['keyword'];
            }
            if (isset($extraFilters['genre'])) {
                $filters['with_genres'] = $extraFilters['genre'];
            }
            if (isset($extraFilters['productionCountry'])) {
                $filters['with_origin_country'] =
                    $extraFilters['productionCountry'];
            }
            if (isset($extraFilters['language'])) {
                $filters['with_original_language'] = $extraFilters['language'];
            }
        }

        // fetch from tmdb
        $titles = app(TmdbApi::class)->browse(1, $modelType, $filters)[
            'results'
        ];

        // store in local db
        return $titles
            ->map(function ($titleData) {
                return Title::firstOrCreateFromEncodedTmdbId(
                    $titleData['id'],
                )->maybeUpdateFromExternal([
                    'forceAutomation' => true,
                    //'updateLast3Seasons' => true,
                ]);
            })
            ->filter();
    }

    protected function buildFilters(string $method, string $modelType): array
    {
        $type = "{$modelType}.{$method}";
        switch ($type) {
            case 'movie.mostPopular':
                $from = Carbon::now()
                    ->subMonths(6)
                    ->format('Y-m-d');
                return [
                    'sort_by' => 'popularity.desc',
                    'primary_release_date.gte' => $from,
                ];
            case 'movie.topRated':
            case 'series.topRated':
                return [
                    'sort_by' => 'vote_average.desc',
                    'vote_count.gte' => 600,
                ];
            case 'movie.upcoming':
                $from = Carbon::now()
                    ->addDay()
                    ->format('Y-m-d');
                $to = Carbon::now()
                    ->addMonth()
                    ->format('Y-m-d');
                return [
                    'sort_by' => 'popularity.desc',
                    'with_release_type' => '2|3',
                    'primary_release_date.gte' => $from,
                    'primary_release_date.lte' => $to,
                ];
            case 'movie.nowPlaying':
                $from = Carbon::now()
                    ->subMonths(2)
                    ->format('Y-m-d');
                $to = Carbon::now()
                    ->subDays(2)
                    ->format('Y-m-d');
                return [
                    'sort_by' => 'popularity.desc',
                    'with_release_type' => '2|3',
                    'primary_release_date.gte' => $from,
                    'primary_release_date.lte' => $to,
                ];
            case 'series.mostPopular':
                return [
                    'sort_by' => 'popularity.desc',
                ];
            case 'series.airingThisWeek':
                $from = Carbon::now()
                    ->startOfDay()
                    ->format('Y-m-d');
                $to = Carbon::now()
                    ->startOfDay()
                    ->addDays(6)
                    ->format('Y-m-d');
                return [
                    'sort_by' => 'popularity.desc',
                    'air_date.gte' => $from,
                    'air_date.lte' => $to,
                ];
            case 'series.airingToday':
                $from = Carbon::now()
                    ->startOfDay()
                    ->format('Y-m-d');
                $to = Carbon::now()
                    ->endOfDay()
                    ->format('Y-m-d');
                return [
                    'sort_by' => 'popularity.desc',
                    'air_date.gte' => $from,
                    'air_date.lte' => $to,
                ];
            default:
                return [];
        }
    }
}
