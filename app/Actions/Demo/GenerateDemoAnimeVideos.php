<?php

namespace App\Actions\Demo;

use App\Models\Episode;
use App\Models\Title;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\Console\Output\ConsoleOutput;

class GenerateDemoAnimeVideos
{
    public function execute(): void
    {
        $output = new ConsoleOutput();
        $output->write('Generating demo anime videos... ', true);

        $this->createTitleLinks();
        $this->createEpisodeLinks();
    }

    private function createTitleLinks(): void
    {
        Title::where('is_series', false)
            ->select('id')
            ->whereDoesntHave('videos', function ($query) {
                $query->where('category', 'full')->where('origin', 'local');
            })
            ->chunkById(100, function (Collection $titles) {
                $titleVideos = $titles
                    ->pluck('id')
                    ->map(fn($titleId) => $this->getVideosData($titleId))
                    ->flatten(1);
                Video::insert($titleVideos->toArray());
            });
    }

    private function createEpisodeLinks(): void
    {
        Episode::whereDoesntHave('videos', function ($query) {
            $query->where('category', 'full')->where('origin', 'local');
        })->chunkById(100, function (Collection $episodes) {
            $episodeVideos = $episodes
                ->map(
                    fn(Episode $episode) => $this->getVideosData(
                        $episode->title_id,
                        $episode,
                    ),
                )
                ->flatten(1);
            Video::insert($episodeVideos->toArray());
        });
    }

    private function getVideosData($titleId, Episode $episode = null): array
    {
        $sharedData = [
            'category' => 'full',
            'title_id' => $titleId,
            'season_num' => $episode?->season_number,
            'episode_num' => $episode?->episode_number,
            'episode_id' => $episode?->id,
            'origin' => 'local',
            'approved' => true,
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ];

        $urls = [
            'https://www.youtube.com/embed/ByXuk9QqQkk',
            'https://player.vimeo.com/video/208890816',
            'https://www.dailymotion.com/embed/video/x4qi23d',
            'https://www.youtube.com/embed/xU47nhruN-Q',
            'https://google.com',
        ];

        $languages = ['en', 'ru', 'fr', 'en', 'en'];

        $videos = [];
        for ($i = 0; $i <= 4; $i++) {
            $num = $i + 1;

            $videos[] = array_merge($sharedData, [
                'name' => "Mirror $num",
                'src' => $urls[$i],
                'quality' => $i === 3 ? '4k' : 'hd',
                'language' => $languages[$i],
                'type' => $i === 4 ? 'external' : 'embed',
                'upvotes' => rand(1, 200),
                'downvotes' => rand(1, 30),
                'created_at' => Carbon::now()->subDay(),
            ]);
        }
        return $videos;
    }
}
