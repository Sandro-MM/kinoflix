<?php

namespace App\Http\Controllers;

use App\Actions\Titles\LoadSeasonEpisodeNumbers;
use App\Models\Season;
use App\Models\Title;
use Common\Core\BaseController;

class TitleAutocompleteController extends BaseController
{
    public function __invoke()
    {
        $this->authorize('index', Title::class);

        $search = request('searchQuery');
        $selectedTitleId = request('selectedTitleId');
        $seasonNumber = request('seasonNumber');
        $builder = app(Title::class);

        if ($search) {
            $builder = $builder->search($search);
        }

        $results = $builder
            ->take(10)
            ->get(['id', 'name', 'poster', 'release_date']);

        $results = $results->map(function (Title $title) {
            $normalized = $title->toNormalizedArray();
            if ($title->relationLoaded('season')) {
                $normalized['episodes_count'] =
                    $title->season->episodes_count ?? 0;
            }
            $normalized['seasons_count'] = $title->seasons_count;
            return $normalized;
        });

        if ($selectedTitleId) {
            $title = Title::find($selectedTitleId);
            if ($title) {
                $normalizedTitle = $title->toNormalizedArray();
                $normalizedTitle['seasons_count'] = Season::where(
                    'title_id',
                    $title->id,
                )->count();
                if ($seasonNumber) {
                    $normalizedTitle[
                        'episode_numbers'
                    ] = (new LoadSeasonEpisodeNumbers())->execute(
                        $title->id,
                        $seasonNumber,
                    );
                }
                $results->prepend($normalizedTitle);
            }
        }

        return ['titles' => $results];
    }
}
