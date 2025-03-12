<?php

namespace App\Actions\Demo;

use App\Models\Episode;
use App\Models\Title;
use App\Models\Video;
use App\Models\VideoCaption;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Symfony\Component\Console\Output\ConsoleOutput;

class GenerateDemoStreamVideos
{
    protected array $demoVideos = [
        [
            'name' => 'Demo HLS',
            'src' =>
                'https://stream.mux.com/buWV5Srtc9vUQTWmgpTFkDNlA3zImB7C9CQ2CVgkZpI.m3u8',
            'type' => 'stream',
            'quality' => '1080p',
        ],
        [
            'name' => 'Demo HLS',
            'src' =>
                'https://stream.mux.com/Rus46I1a5LSATgJ6YDhbDo024F7qHEYZBTbOxRZJdIn4.m3u8',
            'type' => 'stream',
            'quality' => '1080p',
        ],
        [
            'name' => 'Demo HLS',
            'src' =>
                'https://stream.mux.com/E7hs5dNds85023rGvL4rrAjPI02BpRE2024XyFnjx007oj4.m3u8',
            'type' => 'stream',
            'quality' => '1080p',
        ],
        [
            'name' => 'Demo HLS',
            'src' =>
                'https://stream.mux.com/Q20238p74cLNL4Bm2ivdjGnSozST6Gec2Ym1EuDnCMJI.m3u8',
            'type' => 'stream',
            'quality' => '1080p',
        ],
        [
            'name' => 'Demo HLS',
            'src' =>
                'https://stream.mux.com/spmRS3NLqWHkkBGEYM4KRhj6Hytnat00AnPS8v3hj9qA.m3u8',
            'type' => 'stream',
            'quality' => '1080p',
        ],
        [
            'name' => 'Demo WebM',
            'src' => 'storage/demo-videos/sprite-fright/sprite-fright.webm',
            'type' => 'video',
            'quality' => '1080p',
            'captions' => [
                [
                    'name' => 'English',
                    'language' => 'en',
                    'url' =>
                        'storage/demo-videos/sprite-fright/subs/sprite-fright.en.vtt',
                ],
                [
                    'name' => 'Russian',
                    'language' => 'ru',
                    'url' =>
                        'storage/demo-videos/sprite-fright/subs/sprite-fright.ru.vtt',
                ],
                [
                    'name' => 'German',
                    'language' => 'de',
                    'url' =>
                        'storage/demo-videos/sprite-fright/subs/sprite-fright.de.vtt',
                ],
                [
                    'name' => 'Italian',
                    'language' => 'it',
                    'url' =>
                        'storage/demo-videos/sprite-fright/subs/sprite-fright.it.vtt',
                ],
            ],
        ],
    ];

    protected Sequence $demoVideoSequence;

    public function execute(): void
    {
        $this->demoVideoSequence = new Sequence(...$this->demoVideos);

        $output = new ConsoleOutput();
        $output->write('Generating demo stream videos... ', true);

        $this->createVideosForAllMovies();
        $this->createEpisodeVideos();
        $this->createCaptions();
    }

    private function createVideosForAllMovies(): void
    {
        Title::where('is_series', false)
            ->whereDoesntHave(
                'videos',
                fn($query) => $query
                    ->where('origin', 'local')
                    ->where('category', 'full'),
            )
            ->select('id')
            ->chunkById(100, function (Collection $titles) {
                $titleVideos = $titles->map(
                    fn($title) => $this->getVideoData($title->id),
                );
                Video::insert($titleVideos->toArray());
            });
    }

    private function createCaptions(): void
    {
        collect($this->demoVideos)
            ->filter(fn($video) => isset($video['captions']))
            ->each(function ($data) {
                Video::where('origin', 'local')
                    ->where('category', 'full')
                    ->where('name', $data['name'])
                    ->whereDoesntHave('captions')
                    ->chunkById(100, function (Collection $videos) use ($data) {
                        $captionPayload = $videos->flatMap(
                            fn(Video $video) => array_map(
                                fn($captionData) => [
                                    'name' => $captionData['name'],
                                    'language' => $captionData['language'],
                                    'url' => $captionData['url'],
                                    'video_id' => $video->id,
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ],
                                $data['captions'],
                            ),
                        );
                        VideoCaption::insert($captionPayload->toArray());
                    });
            });
    }

    private function createEpisodeVideos(): void
    {
        Episode::whereDoesntHave(
            'videos',
            fn($query) => $query
                ->where('origin', 'local')
                ->where('category', 'full'),
        )->chunkById(100, function (Collection $episodes) {
            $episodeVideos = $episodes->map(
                fn(Episode $episode) => $this->getVideoData(
                    $episode->title_id,
                    $episode,
                ),
            );
            Video::insert($episodeVideos->toArray());
        });
    }

    private function getVideoData(int $titleId, Episode $episode = null): array
    {
        $sequence = $this->demoVideoSequence;
        $data = $sequence();

        return [
            'name' => $data['name'],
            'src' => $data['src'],
            'type' => $data['type'],
            'category' => 'full',
            'quality' => $data['quality'],
            'title_id' => $titleId,
            'season_num' => $episode?->season_number,
            'episode_num' => $episode?->episode_number,
            'episode_id' => $episode?->id,
            'origin' => 'local',
            'approved' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'language' => 'en',
        ];
    }
}
