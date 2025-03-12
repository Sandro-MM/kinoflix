<?php

namespace App\Actions\Titles\Store;

use App\Models\Season;
use App\Models\Title;

class StoreSeasonData
{
    private ?Title $title = null;

    public function execute(Title $title, array $data): Title
    {
        if (empty($data)) {
            return $title;
        }

        $this->title = $title;

        $season = $this->persistData($data);
        if (isset($data['cast'])) {
            app(StoreCredits::class)->execute($season, $data['cast']);
        }

        if (isset($data['episodes'])) {
            app(StoreEpisodeData::class)->execute(
                $title,
                $season,
                $data['episodes'],
            );
        }

        return $this->title;
    }

    private function persistData(array $data): Season
    {
        // remove all relation data
        $data = array_filter(
            $data,
            fn($value) => !is_array($value) && $value !== Season::MODEL_TYPE,
        );

        // if season data did not change then timestamps
        // will not be updated because model is not dirty
        $data['updated_at'] = now();

        return Season::updateOrCreate(
            [
                'title_id' => $this->title->id,
                'number' => $data['number'],
            ],
            $data,
        );
    }
}
