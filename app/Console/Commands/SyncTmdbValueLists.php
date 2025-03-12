<?php

namespace App\Console\Commands;

use App\Services\Data\Tmdb\TmdbApi;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SyncTmdbValueLists extends Command
{
    protected $signature = 'tmdb:syncValueLists';

    public function handle(): int
    {
        $this->syncGenres();
        $this->syncCountries();
        $this->syncDepartments();
        $this->syncLanguages();
        $this->syncKeywords();

        return Command::SUCCESS;
    }

    protected function syncKeywords(): void
    {
        $downloadUrl =
            'http://files.tmdb.org/p/exports/keyword_ids_07_08_2023.json.gz';
        $content = gzdecode(file_get_contents($downloadUrl));
        $content = str_replace('"}', '"},', $content);
        $content = rtrim(trim($content), ',');
        file_put_contents(resource_path('lists/tmdb-keywords.json'), '[' . $content . ']');
    }

    protected function syncGenres(): void
    {
        $movieGenres = Http::get(TmdbApi::TMDB_BASE . 'genre/movie/list', [
            'api_key' => config('services.tmdb.key'),
            'language' => 'en-US',
        ])->json()['genres'];

        $tvGenres = Http::get(TmdbApi::TMDB_BASE . 'genre/tv/list', [
            'api_key' => config('services.tmdb.key'),
            'language' => 'en-US',
        ])->json()['genres'];

        $mergedGenres = collect($movieGenres)
            ->merge($tvGenres)
            ->unique('id')
            ->values()
            ->toArray();

        file_put_contents(
            resource_path('lists/tmdb-genres.json'),
            json_encode($mergedGenres),
        );
    }

    private function syncLanguages(): void
    {
        $languages = Http::get(TmdbApi::TMDB_BASE . 'configuration/languages', [
            'api_key' => config('services.tmdb.key'),
        ])->json();

        $languages = array_map(fn($language) => [
            'code' => $language['iso_639_1'],
            'name' => $language['english_name'],
        ], $languages);

        file_put_contents(
            resource_path('lists/tmdb-languages.json'),
            json_encode($languages),
        );
    }

    protected function syncDepartments(): void
    {
        $departments = Http::get(TmdbApi::TMDB_BASE . 'configuration/jobs', [
            'api_key' => config('services.tmdb.key'),
        ])->json();

        file_put_contents(
            resource_path('lists/tmdb-departments.json'),
            json_encode($departments),
        );
    }

    protected function syncCountries(): void
    {
        $countries = Http::get(TmdbApi::TMDB_BASE . 'configuration/countries', [
            'api_key' => config('services.tmdb.key'),
        ])->json();

        $countries = array_map(fn($country) => [
            'code' => $country['iso_3166_1'],
            'name' => $country['english_name'],
        ], $countries);

        file_put_contents(
            resource_path('lists/tmdb-countries.json'),
            json_encode($countries),
        );
    }
}
