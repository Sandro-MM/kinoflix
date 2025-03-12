<?php

namespace App\Actions\Plays;

use App\Models\Episode;
use App\Models\Season;
use App\Models\Title;
use App\Models\User;
use Common\Admin\Analytics\Actions\BuildDemoAnalyticsReport;
use Common\Admin\Analytics\Actions\DemoTrend;
use Common\Database\Metrics\MetricDateRange;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class GenerateFakePlaysData
{
    protected MetricDateRange $dateRange;

    public function __construct(protected array $params)
    {
        $this->dateRange = new MetricDateRange(
            start: $params['startDate'] ?? null,
            end: $params['endDate'] ?? null,
            timezone: $params['timezone'] ?? null,
        );
    }

    public function playsTrend(Builder $builder): array
    {
        return (new DemoTrend($builder, dateRange: $this->dateRange))->count();
    }

    public function partitionMetric(string $groupBy): array
    {
        $method =
            'build' .
            Str::of($groupBy)
                ->ucfirst()
                ->plural()
                ->toString() .
            'Metric';
        return (new BuildDemoAnalyticsReport($this->params))->$method();
    }

    public function titles(bool $isSeries = null): array
    {
        return Title::orderBy('popularity', 'desc')
            ->when(
                !is_null($isSeries),
                fn($query) => $query->where('is_series', $isSeries),
            )
            ->where('language', 'en')
            ->limit(30)
            ->compact()
            ->get()
            ->map(
                fn(Title $title) => [
                    'label' => $title->name,
                    'value' => random_int(50, 1654),
                    'percentage' => random_int(1, 100),
                    'model' => $title,
                ],
            )
            ->sortByDesc('value')
            ->values()
            ->toArray();
    }

    public function seasons(int $titleId): array
    {
        return Season::where('title_id', $titleId)
            ->with(['title' => fn($query) => $query->compact()])
            ->limit(30)
            ->get()
            ->map(function (Season $season) {
                return [
                    'label' => $season['name'],
                    'value' => random_int(50, 1654),
                    'percentage' => random_int(1, 100),
                    'model' => $season,
                ];
            })
            ->sortByDesc('value')
            ->values()
            ->toArray();
    }

    public function episodes(int $titleId): array
    {
        return Episode::where('title_id', $titleId)
            ->with(['title' => fn($query) => $query->compact()])
            ->limit(30)
            ->get()
            ->map(function (Episode $episode) {
                return [
                    'label' => $episode['name'],
                    'value' => random_int(50, 1654),
                    'percentage' => random_int(1, 100),
                    'model' => $episode,
                ];
            })
            ->sortByDesc('value')
            ->values()
            ->toArray();
    }

    public function videos(): array
    {
        return Title::orderBy('popularity', 'desc')
            ->where('language', 'en')
            ->limit(30)
            ->compact()
            ->with('videos')
            ->get()
            ->filter(fn(Title $title) => $title->videos->isNotEmpty())
            ->map(function (Title $title) {
                $video = $title->videos->random()->toArray();
                $title->unsetRelation('videos');
                $video['title'] = $title->toArray();
                return [
                    'label' => $video['name'],
                    'value' => random_int(50, 1654),
                    'percentage' => random_int(1, 100),
                    'model' => $video,
                ];
            })
            ->sortByDesc('value')
            ->values()
            ->toArray();
    }

    public function users(): array
    {
        return User::inRandomOrder()
            ->limit(30)
            ->compact()
            ->get()
            ->map(
                fn(User $user) => [
                    'label' => $user->name,
                    'value' => random_int(50, 1654),
                    'percentage' => random_int(1, 100),
                    'model' => $user,
                ],
            )
            ->sortByDesc('value')
            ->values()
            ->toArray();
    }
}
