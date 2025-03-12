<?php

namespace App\Services\Settings\Validators;

use App\Services\Data\Tmdb\TmdbApi;
use Common\Settings\Validators\SettingsValidator;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Arr;

class TmdbApiKeyValidator implements SettingsValidator
{
    public const KEYS = ['tmdb_api_key'];

    public function fails($values)
    {
        if ($apiKey = Arr::get($values, 'tmdb_api_key')) {
            config(['services.tmdb.key' => $apiKey]);
        }

        try {
            app(TmdbApi::class)->browse();
        } catch (ClientException $e) {
            $errResponse = json_decode(
                $e
                    ->getResponse()
                    ->getBody()
                    ->getContents(),
                true,
                512,
                JSON_THROW_ON_ERROR,
            );
            return $this->getMessage($errResponse);
        }
    }

    /**
     * @param array $errResponse
     * @return array
     */
    private function getMessage($errResponse)
    {
        return ['tmdb_api_key' => 'This Themoviedb api key is not valid.'];
    }
}
