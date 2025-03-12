<?php

namespace App\Http\Controllers;

use App\Actions\Plays\LogVideoPlay;
use App\Actions\Titles\Retrieve\GetRelatedTitles;
use App\Models\Episode;
use App\Models\Title;
use App\Models\Video;
use Common\Core\BaseController;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class WatchController extends BaseController
{
    public function __invoke(Video $video)
    {
        $this->authorize('show', $video);

        $video = $this->loadVideoRelations($video);

        (new LogVideoPlay())->execute($video);

        $title = $this->loadTitle($video);

        $episode = $video->episode_id
            ? Episode::findOrFail($video->episode_id)
            : null;

        $data = [
            'loader' => 'watchPage',
            'title' => $title,
            'episode' => $episode,
            'video' => $video,
            'related_videos' => $this->videosByTags($video->title),
            'alternative_videos' => settings('streaming.show_video_selector')
                ? $this->loadAlternativeVideos($video)
                : [],
        ];

        return $this->renderClientOrApi([
            'data' => $data,
            'pageName' => 'watch-page',
        ]);
    }

    protected function loadTitle(Video $video)
    {
        $title = Title::select([
            'id',
            'name',
            'description',
            'backdrop',
            'poster',
            'is_series',
        ])
            ->withCount('seasons')
            ->findOrFail($video->title_id);

        $title->description = Str::limit($title->description, 310);

        return $title;
    }

    protected function loadVideoRelations(Video $video)
    {
        $video->load([
            'captions',
            'reports' => fn($q) => $q
                ->where('user_id', auth()->id())
                ->orWhere('user_ip', getIp()),
            'latestPlay' => function (HasOne $builder) {
                $builder
                    ->forCurrentUser()
                    ->whereNotNull('time_watched')
                    ->select(['id', 'video_id', 'time_watched']);
            },
        ]);
        if ($video->reports->first()) {
            $video->current_user_reported = true;
        }
        return $video;
    }

    private function videosByEpisode(Title $title, int $seasonNum)
    {
        [$col, $direction] = explode(':', settings('streaming.default_sort'));

        $currSeasonNum = $seasonNum;
        $prevSeasonNum = $seasonNum - 1;
        $nextSeasonNum = $seasonNum + 1;

        $videos = $title
            ->videos()
            ->with(['captions', 'episode', 'title' => fn($q) => $q->compact()])
            ->where('approved', true)
            ->where('category', 'full')
            ->whereNotNull('episode_id')
            ->whereIn('season_num', [
                $currSeasonNum,
                $nextSeasonNum,
                $prevSeasonNum,
            ])
            ->orderBy($col, $direction)
            ->groupBy(['season_num', 'episode_num'])
            ->limit(30)
            ->get();

        if ($videos->isEmpty()) {
            return [];
        }

        $grouped = $videos
            ->groupBy('season_num')
            ->map(function (Collection $videos, $seasonNum) use (
                $prevSeasonNum,
                $nextSeasonNum,
            ) {
                if ($seasonNum === $prevSeasonNum) {
                    return $videos->sortByDesc('episode_num')->first();
                } elseif ($seasonNum === $nextSeasonNum) {
                    return $videos->sortByDesc('episode_num')->last();
                } else {
                    // current season episodes
                    return $videos->sortBy('season')->sortBy('episode_num');
                }
            });

        $videos = $grouped->get($currSeasonNum)->values();

        // make sure prev season last episode appears first
        if ($prevSeason = $grouped->get($prevSeasonNum)) {
            $videos->prepend($prevSeason);
        }

        // make sure next season first episode appears last
        if ($nextSeason = $grouped->get($nextSeasonNum)) {
            $videos->push($nextSeason);
        }

        return $videos->values();
    }

    private function videosByTags(Title $title)
    {
        $title->load(['keywords', 'genres']);

        $related = app(GetRelatedTitles::class)->execute($title, [
            'limit' => 6,
            'compact' => true,
        ]);

        $videos = [];

        if ($related->isNotEmpty()) {
            $related->load([
                'videos' => fn(HasMany $builder) => $builder
                    ->where('approved', true)
                    ->fromConfiguredCategory(),
            ]);
            $videos = $related
                ->map(function (Title $title) {
                    if ($video = $title->videos->first()) {
                        $title->setRelation('videos', []);
                        $video->title = $title;
                        return $video;
                    }
                })
                ->filter()
                ->values();
        }

        return $videos;
    }

    protected function loadAlternativeVideos(Video $video)
    {
        $builder = Video::where('title_id', $video->title_id);
        if ($video->season_num) {
            $builder->where('season_num', $video->season_num);
        }
        if ($video->episode_num) {
            $builder->where('episode_num', $video->episode_num);
        }

        return $builder
            ->where('approved', true)
            ->limit(10)
            ->when(
                settings('streaming.prefer_full'),
                fn($query) => $query->where('category', 'full'),
            )
            ->applySelectedSort()
            ->get();
    }
}
