<?php

namespace App\Http\Controllers;

use App\Actions\Titles\DeleteSeasons;
use App\Actions\Titles\LoadSeasonEpisodeNumbers;
use App\Loaders\SeasonLoader;
use App\Models\Title;
use Common\Core\BaseController;

class SeasonController extends BaseController
{
    public function show()
    {
        $data = (new SeasonLoader())->loadData(request('loader'));

        $this->authorize('show', $data['title']);

        return $this->renderClientOrApi([
            'pageName' => 'season-page',
            'data' => $data,
        ]);
    }

    public function store($titleId)
    {
        $this->authorize('update', Title::class);

        $title = Title::withCount('seasons')->findOrFail($titleId);

        $season = $title->seasons()->create([
            'number' => $title->seasons_count + 1,
        ]);

        return $this->success(['season' => $season]);
    }

    public function destroy(int $seasonId)
    {
        $this->authorize('update', Title::class);

        app(DeleteSeasons::class)->execute([$seasonId]);

        return $this->success();
    }

    public function episodeNumbers()
    {
        $titleId = request()->route('titleId');
        $seasonNumber = request()->route('seasonNumber');

        $episodeNumbers = (new LoadSeasonEpisodeNumbers())->execute(
            $titleId,
            $seasonNumber,
        );

        return $this->success(['episodeNumbers' => $episodeNumbers]);
    }
}
