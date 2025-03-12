<?php

namespace App\Actions\Videos;

use App\Models\Episode;
use App\Models\Video;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class CrupdateVideo
{
    public function execute(array $params, int $videoId = null): Video
    {
        if (Arr::get($params, 'episode_num')) {
            $episode = Episode::where('title_id', $params['title_id'])
                ->where('episode_number', $params['episode_num'])
                ->where('season_number', $params['season_num'])
                ->firstOrFail();
            $params['episode_id'] = $episode->id;
        }

        $params['positive_votes'] = 0;
        $params['negative_votes'] = 0;
        $params['origin'] = 'local';

        $captions = Arr::pull($params, 'captions');

        if ($videoId) {
            $video = Video::findOrFail($videoId);
            $video->fill($params)->save();
        } else {
            $params['approved'] = $this->shouldAutoApprove();
            $params['user_id'] = Auth::id();
            $video = Video::create($params);
        }

        if (isset($captions)) {
            $this->syncCaptions($video, $captions);
        }

        return $video;
    }

    private function shouldAutoApprove(): bool
    {
        return settings('streaming.auto_approve') ||
            Auth::user()->hasPermission('admin');
    }

    protected function syncCaptions(Video $video, array $captions): void
    {
        $captions = collect($captions);

        // delete captions that were removed
        $captionIds = $captions->pluck('id')->filter();
        $video
            ->captions()
            ->whereNotIn('id', $captionIds)
            ->delete();

        $captions->each(function ($caption, $index) use ($video) {
            if (isset($caption['id'])) {
                $video
                    ->captions()
                    ->where('id', $caption['id'])
                    ->update([
                        'name' => $caption['name'],
                        'language' => $caption['language'],
                        'url' => $caption['url'],
                        'order' => $index,
                    ]);
            } else {
                $caption['user_id'] = Auth::id();
                $caption['order'] = $index;
                $video->captions()->create($caption);
            }
        });
    }
}
