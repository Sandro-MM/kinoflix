<?php

namespace App\Actions\Plays;

use App\Actions\Album;
use App\Actions\TrackPlay;
use App\Models\Episode;
use App\Models\Movie;
use App\Models\Season;
use App\Models\Series;
use App\Models\Title;
use App\Models\User;
use App\Models\Video;
use App\Models\VideoPlay;
use Common\Core\Values\ValueLists;
use Common\Database\Metrics\MetricDateRange;
use Common\Database\Metrics\Partition;
use Common\Database\Metrics\Trend;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;

class BuildPlaysReport
{
    protected Builder $builder;
    protected array $params = [];
    protected MetricDateRange $dateRange;
    protected int $modelId;

    public function execute(array $params): array
    {
        $this->params = $params;
        $this->builder = $this->createBuilder();

        $this->dateRange = new MetricDateRange(
            start: $this->params['startDate'] ?? null,
            end: $this->params['endDate'] ?? null,
            timezone: $this->params['timezone'] ?? null,
        );

        $metrics = explode(',', Arr::get($params, 'metrics', 'plays'));

        return collect($metrics)
            ->mapWithKeys(function ($metric) {
                if ($metric === 'movies') {
                    return ['movies' => $this->getTitlesMetric(false)];
                } elseif ($metric === 'series') {
                    return ['series' => $this->getTitlesMetric(true)];
                } else {
                    $method = sprintf('get%sMetric', ucfirst($metric));
                    if (method_exists($this, $method)) {
                        return [$metric => $this->$method()];
                    }
                    return [$metric => []];
                }
            })
            ->toArray();
    }

    protected function createBuilder(): Builder
    {
        $model = Arr::get($this->params, 'model', '');
        $parts = explode('=', $model);

        // might send track_play=0, check if variable is set, instead of being truthy
        if (!isset($parts[0]) || !isset($parts[1])) {
            $parts = ['video_play', 0];
        }

        $model = modelTypeToNamespace($parts[0]);
        $this->modelId = (int) $parts[1];

        switch ($model) {
            case VideoPlay::class:
                // all plays, not scoped to any resource (for admin area)
                Gate::authorize('admin.access');
                $builder = VideoPlay::query();
                break;
            case Video::class:
                $video = Video::findOrFail($this->modelId);
                Gate::authorize('update', $video);
                $builder = $video->plays()->getQuery();
                break;
            case Movie::class:
            case Series::class:
            case Title::class:
                $title = Title::findOrFail($this->modelId);
                Gate::authorize('update', $title);
                $builder = $title->plays()->getQuery();
                break;
            case Season::class:
                $season = Season::with(['title'])->findOrFail($this->modelId);
                Gate::authorize('update', $season->title);
                $builder = VideoPlay::join(
                    'videos',
                    'video_plays.video_id',
                    '=',
                    'videos.id',
                )
                    ->join('titles', 'videos.title_id', '=', 'titles.id')
                    ->where('titles.id', $season->title_id)
                    ->where('videos.season_num', $season->number);
                break;
            case Episode::class:
                $episode = Episode::with(['title'])->findOrFail($this->modelId);
                Gate::authorize('update', $episode->title);
                $builder = $episode->plays()->getQuery();
                break;
            default:
                throw new Exception();
        }

        return $builder;
    }

    protected function getPlaysMetric(): array
    {
        if (config('common.site.fake_plays_data')) {
            $data = (new GenerateFakePlaysData($this->params))->playsTrend(
                $this->builder,
            );
        } else {
            $data = (new Trend(
                $this->builder,
                dateRange: $this->dateRange,
            ))->count();
        }

        return [
            'granularity' => $this->dateRange->granularity,
            'total' => array_sum(Arr::pluck($data, 'value')),
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getDevicesMetric(): array
    {
        return $this->getPartitionMetric('device', 5);
    }

    protected function getBrowsersMetric(): array
    {
        return $this->getPartitionMetric('browser', 8);
    }

    protected function getPlatformsMetric(): array
    {
        return $this->getPartitionMetric('platform', 5);
    }

    protected function getTitlesMetric(bool $isSeries = null): array
    {
        if (config('common.site.fake_plays_data')) {
            $data = (new GenerateFakePlaysData($this->params))->titles(
                $isSeries,
            );
        } else {
            $data = (new Partition(
                $this->builder
                    ->join('videos', 'video_plays.video_id', '=', 'videos.id')
                    ->join('titles', 'videos.title_id', '=', 'titles.id')
                    ->when(
                        !is_null($isSeries),
                        fn($query) => $query->where('is_series', $isSeries),
                    )
                    ->orderBy('aggregate', 'desc'),
                groupBy: 'title_id',
                dateRange: $this->dateRange,
                limit: 30,
            ))->count();

            $titles = Title::whereIn('id', Arr::pluck($data, 'label'))
                ->compact()
                ->get();

            $data = array_map(function ($item) use ($titles) {
                $title = $titles->firstWhere('id', $item['label']);
                $item['model'] = $title;
                $item['label'] = $title->name;
                return $item;
            }, $data);
        }

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getSeasonsMetric(): array
    {
        if (config('common.site.fake_plays_data')) {
            $data = (new GenerateFakePlaysData($this->params))->seasons(
                $this->modelId,
            );
        } else {
            $data = (new Partition(
                $this->builder
                    ->whereNotNull('season_num')
                    ->orderBy('aggregate', 'desc'),
                groupBy: 'season_num',
                dateRange: $this->dateRange,
                limit: 30,
            ))->count();

            $seasons = Season::where('title_id', $this->modelId)
                ->whereIn('number', Arr::pluck($data, 'label'))
                ->with(['title' => fn($query) => $query->compact()])
                ->get();

            $data = array_map(function ($item) use ($seasons) {
                $season = $seasons->firstWhere('number', (int) $item['label']);
                $item['model'] = $season;
                $item['label'] = __('Season :number', [
                    'number' => $season->number,
                ]);
                return $item;
            }, $data);
        }

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getEpisodesMetric(): array
    {
        if (config('common.site.fake_plays_data')) {
            $data = (new GenerateFakePlaysData($this->params))->episodes(
                $this->modelId,
            );
        } else {
            $data = (new Partition(
                $this->builder
                    ->whereNotNull('episode_id')
                    ->orderBy('aggregate', 'desc'),
                groupBy: 'episode_id',
                dateRange: $this->dateRange,
                limit: 30,
            ))->count();

            $episodes = Episode::whereIn('id', Arr::pluck($data, 'label'))
                ->with(['title' => fn($query) => $query->compact()])
                ->get();

            $data = array_map(function ($item) use ($episodes) {
                $episode = $episodes->firstWhere('id', (int) $item['label']);
                $item['model'] = $episode;
                $item['label'] = __('Season :s, Episode :e', [
                    's' => $episode->season_number,
                    'e' => $episode->number,
                ]);
                return $item;
            }, $data);
        }

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getVideosMetric(): array
    {
        if (config('common.site.fake_plays_data')) {
            $data = (new GenerateFakePlaysData($this->params))->videos();
        } else {
            $data = (new Partition(
                $this->builder->orderBy('aggregate', 'desc'),
                groupBy: 'video_id',
                dateRange: $this->dateRange,
                limit: 30,
            ))->count();

            $videos = Video::whereIn('id', Arr::pluck($data, 'label'))
                ->with(['title' => fn($query) => $query->compact()])
                ->get();

            $data = array_map(function ($item) use ($videos) {
                $video = $videos->firstWhere('id', $item['label']);
                $item['model'] = $video;
                $item['label'] = $video?->name;
                return $item;
            }, $data);
        }

        $data = array_values(array_filter($data, fn($item) => $item['label']));

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getUsersMetric(): array
    {
        if (config('common.site.fake_plays_data')) {
            $data = (new GenerateFakePlaysData($this->params))->users();
        } else {
            $data = (new Partition(
                $this->builder->orderBy('aggregate', 'desc'),
                groupBy: 'user_id',
                dateRange: $this->dateRange,
                limit: 30,
            ))->count();

            $userIds = collect($data)
                ->pluck('label')
                ->filter()
                ->unique();
            $users = User::whereIn('id', $userIds)->get();

            $data = array_map(function ($item) use ($users) {
                $user =
                    $users->firstWhere('id', $item['label']) ??
                    new User(['first_name' => __('Guest user')]);
                $item['model'] = $user;
                $item['label'] = $user->name;
                return $item;
            }, $data);
        }

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }

    protected function getLocationsMetric(): array
    {
        $metric = $this->getPartitionMetric('location');

        $countries = app(ValueLists::class)->countries();

        $metric['datasets'][0]['data'] = array_map(function ($location) use (
            $countries,
            $metric,
        ) {
            // only short country code is stored in DB, get and return full country name as well
            $location['code'] = strtolower($location['label']);
            $location['label'] =
                Arr::first(
                    $countries,
                    fn($country) => strtolower($country['code']) ===
                        strtolower($location['code']),
                )['name'] ?? $location['label'];
            return $location;
        }, $metric['datasets'][0]['data']);

        return $metric;
    }

    protected function getPartitionMetric(
        string $groupBy,
        int $limit = 10,
    ): array {
        if (config('common.site.fake_plays_data')) {
            $data = (new GenerateFakePlaysData($this->params))->partitionMetric(
                $groupBy,
            );
            if (isset($data['datasets'])) {
                $data = $data['datasets'][0]['data'];
            }
        } else {
            $data = (new Partition(
                $this->builder,
                groupBy: $groupBy,
                dateRange: $this->dateRange,
                limit: $limit,
            ))->count();
        }

        return [
            'datasets' => [
                [
                    'label' => __('Plays'),
                    'data' => $data,
                ],
            ],
        ];
    }
}
