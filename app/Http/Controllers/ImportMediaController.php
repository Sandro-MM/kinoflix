<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\Title;
use App\Services\Data\Tmdb\TmdbApi;
use Carbon\Carbon;
use Common\Core\BaseController;

class ImportMediaController extends BaseController
{
    public function importMediaItem()
    {
        $this->authorize('store', Title::class);

        $data = $this->validate(request(), [
            'media_type' => 'required|string',
            'tmdb_id' => 'required|integer',
        ]);

        if ($data['media_type'] === Person::MODEL_TYPE) {
            $mediaItem = Person::withoutGlobalScope('adult')
                ->firstOrCreate([
                    'tmdb_id' => $data['tmdb_id'],
                ])
                ->maybeUpdateFromExternal([
                    'forceAutomation' => true,
                    'ignoreLastUpdate' => true,
                ]);
        } else {
            $mediaItem = Title::withoutGlobalScope('adult')
                ->firstOrCreate([
                    'tmdb_id' => $data['tmdb_id'],
                    'is_series' => $data['media_type'] === Title::SERIES_TYPE,
                ])
                ->maybeUpdateFromExternal([
                    'forceAutomation' => true,
                    'updateLast3Seasons' => true,
                    'ignoreLastUpdate' => true,
                ]);
        }

        if (!$mediaItem) {
            abort(404);
        }

        return ['mediaItem' => $mediaItem];
    }

    public function importViaBrowse()
    {
        $this->authorize('store', Title::class);

        if (!config('services.tmdb.key')) {
            abort(
                403,
                'Enter your Themoviedb API key in settings page before importing titles.',
            );
        }

        @set_time_limit(0);
        @ini_set('memory_limit', '200M');

        $tmdbParams = [
            'with_release_type' => '2|3',
        ];

        if (request('country')) {
            $tmdbParams['with_origin_country'] = strtoupper(request('country'));
        }
        if (request('language')) {
            $tmdbParams['with_original_language'] = request('language');
        }
        if (request('min_rating')) {
            $tmdbParams['vote_average.gte'] = request('min_rating');
        }
        if (request('max_rating')) {
            $tmdbParams['vote_average.lte'] = request('max_rating');
        }
        if (request('genres')) {
            $tmdbParams['with_genres'] = request('genres');
        }
        if (request('keywords')) {
            $tmdbParams['with_keywords'] = request('keywords');
        }
        if (request('start_date') && request('end_date')) {
            $tmdbParams['release_date.gte'] = Carbon::parse(
                request('start_date'),
            )->format('Y-m-d');
            $tmdbParams['release_date.lte'] = Carbon::parse(
                request('end_date'),
            )->format('Y-m-d');
        }

        $response = app(TmdbApi::class)->browse(
            request('current_page', 1),
            request('type', 'movie'),
            $tmdbParams,
        );

        $titles = $response['results']
            ->map(function ($result) {
                return Title::withoutGlobalScope('adult')
                    ->firstOrCreate([
                        'tmdb_id' => $result['tmdb_id'],
                        'is_series' => $result['is_series'],
                    ])
                    ->maybeUpdateFromExternal([
                        'forceAutomation' => true,
                    ]);
            })
            ->filter()
            ->values();

        return [
            'titles' => $titles,
            'total_pages' => $response['total_pages'],
            'current_page' => request('current_page', 1),
        ];
    }
}
