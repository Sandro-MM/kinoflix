<?php

namespace App\Http\Controllers;

use App\Loaders\EpisodeLoader;
use App\Models\Episode;
use App\Models\Title;
use Common\Core\BaseController;
use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;

class EpisodeController extends BaseController
{
    public function show()
    {
        $data = (new EpisodeLoader())->loadData(request('loader'));

        $this->authorize('show', $data['title']);

        return $this->renderClientOrApi([
            'data' => $data,
            'pageName' => 'episode-page',
        ]);
    }

    public function update(Title $title, int $seasonNumber, int $episodeNumber)
    {
        $this->authorize('update', $title);

        $episode = $title
            ->episodes()
            ->where('season_number', $seasonNumber)
            ->where('episode_number', $episodeNumber)
            ->firstOrFail();

        $this->validate(request(), [
            'episode_number' => [
                'integer',
                Rule::unique('episodes')
                    ->ignore($episode->episode_number, 'episode_number')
                    ->where(function (Builder $query) use ($episode) {
                        $query
                            ->where('season_number', $episode->season_number)
                            ->where('title_id', $episode->title_id);
                    }),
            ],
        ]);

        $episode->fill(request()->all())->save();

        return $this->success(['episode' => $episode]);
    }

    public function store(Title $title, int $seasonNumber)
    {
        $this->authorize('update', $title);

        $season = $title->findSeason($seasonNumber)->loadCount('episodes');

        $this->validate(request(), [
            'episode_number' => [
                'integer',
                Rule::unique('episodes')->where(function (Builder $query) use (
                    $season,
                ) {
                    $query
                        ->where('season_number', $season->number)
                        ->where('title_id', $season->title_id);
                }),
            ],
        ]);

        $epNum = request('episode_number');
        if (!$epNum) {
            $epNum =
                $season
                    ->episodes()
                    ->orderBy('episode_number', 'desc')
                    ->value('episode_number') + 1;
        }

        $episode = Episode::create(
            array_merge(request()->all(), [
                'season_number' => $season->number,
                'episode_number' => $epNum,
                'season_id' => $season->id,
                'title_id' => $season->title_id,
            ]),
        );

        return $this->success(['episode' => $episode]);
    }

    public function destroy(int $id)
    {
        $this->authorize('destroy', Title::class);

        $episode = Episode::findOrFail($id);
        $episode->credits()->detach();
        $episode->delete();

        return $this->success();
    }
}
