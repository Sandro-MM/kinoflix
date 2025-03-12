<?php

namespace App\Actions\Titles\Store;

use App\Models\Episode;
use App\Models\Season;
use App\Models\Title;
use Illuminate\Support\Collection;

class StoreEpisodeData
{
    public function execute(Title $title, Season $season, $episodes): Title
    {
        $existingEpisodes = $season->episodes()->get();
        foreach ($episodes as $episodeData) {
            $episode = $this->storePrimaryData(
                $season,
                $existingEpisodes,
                $episodeData,
            );
            app(StoreCredits::class)->execute($episode, $episodeData['cast']);
        }

        return $title;
    }

    private function storePrimaryData(
        Season $season,
        Collection $existingEpisodes,
        array $episodeData,
    ): Episode {
        $episodeData = array_filter(
            $episodeData,
            fn($value) => !is_array($value) && $value !== Episode::MODEL_TYPE,
        );
        $episodeData['title_id'] = $season->title_id;
        unset($episodeData['id']);

        $existingEpisode = $existingEpisodes->firstWhere(
            'episode_number',
            $episodeData['episode_number'],
        );

        if ($existingEpisode) {
            $existingEpisode->update($episodeData);
            return $existingEpisode;
        } else {
            return $season->episodes()->create($episodeData);
        }
    }
}
