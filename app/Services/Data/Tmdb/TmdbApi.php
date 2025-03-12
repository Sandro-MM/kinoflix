<?php

namespace App\Services\Data\Tmdb;

use App\Actions\People\DeletePeople;
use App\Actions\Titles\DeleteSeasons;
use App\Actions\Titles\DeleteTitles;
use App\Models\Person;
use App\Models\Title;
use Common\Core\HttpClient;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class TmdbApi
{
    public const TMDB_BASE = 'https://api.themoviedb.org/3/';
    public const DEFAULT_TMDB_LANGUAGE = 'en-US';

    protected bool $includeAdult = false;
    protected string $language = self::DEFAULT_TMDB_LANGUAGE;
    protected HttpClient $http;

    public function __construct()
    {
        $this->language = settings(
            'tmdb.language',
            self::DEFAULT_TMDB_LANGUAGE,
        );
        $this->includeAdult = settings('tmdb.includeAdult', false);
    }

    public function getPerson(Person $person): array|null
    {
        $appends = [];

        // only import filmography if it's set by user
        if (settings('content.automate_filmography')) {
            $appends[] = 'combined_credits';
        }

        $response = $this->call("person/{$person->tmdb_id}", [
            'append_to_response' => implode(',', $appends),
        ]);

        // person does not exist anymore on themoviedb
        if (
            Arr::get($response, 'success') === false &&
            Arr::get($response, 'status_code') === 34
        ) {
            if (config('common.site.tmdb_delete_when_sync')) {
                app(DeletePeople::class)->execute([$person->id]);
                return null;
            } else {
                return [];
            }
        }

        $response['fully_synced'] = true;

        return app(TransformData::class)
            ->execute([$response])
            ->first();
    }

    public function getSeason(Title $title, $seasonNumber)
    {
        if (!$title->tmdb_id) {
            return [];
        }

        $response = $this->call("tv/{$title->tmdb_id}/season/{$seasonNumber}", [
            'append_to_response' => 'credits',
        ]);

        // season does not exist anymore on themoviedb
        if (
            Arr::get($response, 'success') === false &&
            Arr::get($response, 'status_code') === 34
        ) {
            if (config('common.site.tmdb_delete_when_sync')) {
                $seasonId = $title
                    ->seasons()
                    ->where('number', $seasonNumber)
                    ->value('id');
                app(DeleteSeasons::class)->execute([$seasonId]);
                return null;
            } else {
                return [];
            }
        }

        $data = app(TransformData::class)
            ->execute([$response])
            ->first();
        $data['fully_synced'] = true;

        return $data;
    }

    public function getTitle(Title $title): array|null
    {
        $appends = [
            'credits',
            'external_ids',
            'images',
            'content_ratings',
            'keywords',
            'release_dates',
            'videos',
            'seasons',
        ];

        $uri = $title->is_series ? 'tv' : 'movie';

        $response = $this->call("$uri/{$title->tmdb_id}", [
            'append_to_response' => implode(',', $appends),
        ]);

        // title does not exist anymore on themoviedb
        if (
            Arr::get($response, 'success') === false &&
            Arr::get($response, 'status_code') === 34
        ) {
            if (config('common.site.tmdb_delete_when_sync')) {
                app(DeleteTitles::class)->execute([$title->id]);
                return null;
            } else {
                return [];
            }
        }

        $data = app(TransformData::class)
            ->execute([$response])
            ->first();

        // fall back to english videos if there are no videos in the current language
        if (!Str::startsWith($this->language, 'en') && empty($data['videos'])) {
            $videos = $this->call("$uri/{$title->tmdb_id}/videos", [
                'language' => 'en-US',
            ]);
            $videos = app(TransformData::class)->formatVideos(
                $videos['results'],
            );
            $data['videos'] = $videos;
        }

        $data['fully_synced'] = true;
        return $data;
    }

    public function search(string $query, array $params = []): Collection
    {
        $response = $this->call('search/multi', ['query' => $query]);
        $results = app(TransformData::class)->execute($response['results']);

        $type = Arr::get($params, 'type');
        $limit = Arr::get($params, 'limit', 8);

        if ($type) {
            $results = $results->filter(
                fn($result) => $result['type'] === $type,
            );
        }

        return $results
            ->sortByDesc('popularity')
            ->slice(0, $limit)
            ->values();
    }

    public function browse($page = 1, $type = 'movie', $queryParams = []): array
    {
        if ($page > 500) {
            throw new Exception('Maximum page is 500');
        }

        if ($type === 'series') {
            $type = 'tv';
        }

        $apiParams = array_merge(
            ['sort_by' => 'popularity.desc', 'page' => $page],
            $queryParams,
        );

        $response = $this->call("discover/$type", $apiParams);
        $response['results'] = app(TransformData::class)->execute(
            $response['results'],
        );

        return $response;
    }

    public function trendingPeople(): Collection
    {
        $response = $this->call('person/popular');
        return app(TransformData::class)->execute($response['results']);
    }

    protected function call(string $uri, array $queryParams = []): array
    {
        $key = config('services.tmdb.key');
        $url = self::TMDB_BASE . "$uri?api_key=$key";

        $queryParams = array_merge(
            [
                // need to send "true" and not "1" otherwise tmdb will not work
                'include_adult' => $this->includeAdult ? 'true' : 'false',
                'language' => $this->language,
                'region' => 'US',
                'include_image_language' => 'en,null',
            ],
            $queryParams,
        );
        $url .= '&' . urldecode(http_build_query($queryParams));

        return Http::get($url)->json() ?: [];
    }
}
