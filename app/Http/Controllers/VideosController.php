<?php

namespace App\Http\Controllers;

use App\Actions\Plays\LogVideoPlay;
use App\Actions\Videos\CrupdateVideo;
use App\Models\Video;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Common\Database\Datasource\DatasourceFilters;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class VideosController extends BaseController
{
    public function index()
    {
        $this->authorize('index', Video::class);

        $builder = Video::with([
            'captions',
            'title' => fn(BelongsTo $query) => $query->with('seasons'),
        ]);

        $filters = new DatasourceFilters(request('filters'));

        if (
            $titleFilter =
                $filters->getAndRemove('title_id') ?? request('title_id')
        ) {
            $titleId = $titleFilter['value'] ?? request('title_id');
            $season = $titleFilter['season'] ?? request('season');
            $episode = $titleFilter['episode'] ?? request('episode');
            $builder->where('title_id', $titleId);
            $builder->when($season, fn($q) => $q->where('season_num', $season));
            $builder->when(
                $episode,
                fn($q) => $q->where('episode_num', $episode),
            );
        }

        $datasource = new Datasource($builder, request()->all(), $filters);
        $order = $datasource->getOrder();

        if (Str::endsWith($order['col'], 'upvotes')) {
            $datasource->order = false;
            $builder->orderByMostUpvotes();
        }

        // order by percentage of likes, taking into account total amount of likes and dislikes
        if (Str::endsWith($order['col'], 'score')) {
            $datasource->order = false;
            $builder->orderByWeightedScore();
        }

        // add a secondary order by episode number if ordering by season number
        if (Str::endsWith($order['col'], 'season_num')) {
            $datasource->order = false;
            $builder
                ->orderBy('season_num', 'desc')
                ->orderBy('episode_num', 'desc');
        }

        return $this->success(['pagination' => $datasource->paginate()]);
    }

    public function show(Video $video)
    {
        $this->authorize('show', Video::class);

        $video->load(['captions', 'title']);

        return $this->success(['video' => $video]);
    }

    public function store()
    {
        $this->authorize('store', Video::class);

        $this->validate(
            request(),
            [
                'title_id' => 'required|integer',
                'name' => ['required', 'string', 'min:3', 'max:250'],
                'src' => 'required|max:1000',
                'type' => 'required|string|min:3|max:250',
                'category' => 'required|string|min:3|max:20',
                'quality' => 'nullable|string|min:2|max:250',
                'language' => 'required|nullable|string|max:10',
                'season_num' => 'nullable|integer',
                'episode_num' => 'requiredWith:season|integer|nullable',
                'captions' => 'nullable|array',
                'captions.*.name' => 'required|string|max:100',
                'captions.*.url' => 'required|string|max:250',
                'captions.*.language' => 'required|string|max:100',
            ],
            [
                'title_id.*' => __(
                    'Select a title this video should be attached to.',
                ),
            ],
        );

        $video = app(CrupdateVideo::class)->execute(request()->all());

        return $this->success(['video' => $video]);
    }

    public function update($id)
    {
        $this->authorize('update', Video::class);

        $this->validate(
            request(),
            [
                'name' => 'string|min:3|max:250',
                'src' => 'required|max:1000',
                'type' => 'string|min:3|max:1000',
                'quality' => 'nullable|string|min:2|max:250',
                'language' => 'required|nullable|string|max:10',
                'title_id' => 'integer',
                'season_num' => 'nullable|integer',
                'episode_num' => 'requiredWith:season|integer|nullable',
                'captions' => 'nullable|array',
                'captions.*.name' => 'required|string|max:100',
                'captions.*.url' => 'required|string|max:250',
                'captions.*.language' => 'required|string|max:100',
            ],
            [
                'title_id.*' => __(
                    'Select a title this video should be attached to.',
                ),
            ],
        );

        $video = app(CrupdateVideo::class)->execute(request()->all(), $id);

        return $this->success(['video' => $video]);
    }

    public function destroy($ids)
    {
        $ids = explode(',', $ids);
        $this->authorize('destroy', [Video::class, $ids]);

        foreach ($ids as $id) {
            $video = Video::find($id);
            if (is_null($video)) {
                continue;
            }

            $video->delete();
        }

        return $this->success();
    }

    public function logPlay(Video $video)
    {
        $this->authorize('show', Video::class);

        if (request()->getContentType() === 'application/json') {
            $data = request()->all();
        } else {
            $data = json_decode(request()->getContent(), true);
        }

        app(LogVideoPlay::class)->execute($video, $data);

        return $this->success();
    }
}
