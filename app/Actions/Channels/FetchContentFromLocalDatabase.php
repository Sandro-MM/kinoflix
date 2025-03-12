<?php

namespace App\Actions\Channels;

use App\Models\Episode;
use App\Models\Genre;
use App\Models\Keyword;
use App\Models\Person;
use App\Models\ProductionCountry;
use App\Models\Title;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FetchContentFromLocalDatabase
{
    public function execute(
        string $method,
        string $modelType,
        ?array $filters = [],
    ): Collection {
        $isSeries = $modelType === Title::SERIES_TYPE;
        if ($method === 'trendingPeople') {
            return Person::orderBy('popularity', 'desc')
                ->limit(20)
                ->get();
        } elseif ($method === 'mostPopular') {
            return $this->getTitleBuilder($filters)
                ->orderBy('popularity', 'desc')
                ->limit(20)
                ->where('is_series', $isSeries)
                ->get();
        } elseif ($method === 'topRated') {
            return $this->getTopRatedTitles(
                $this->getTitleBuilder($filters),
                $isSeries,
            );
        } elseif ($method === 'upcoming') {
            return $this->getMoviesReleasingBetween(
                $this->getTitleBuilder($filters),
                Carbon::now(),
                Carbon::now()->addWeek(),
            );
        } elseif ($method === 'nowPlaying') {
            return $this->getMoviesReleasingBetween(
                $this->getTitleBuilder($filters),
                Carbon::now(),
                Carbon::now()->subWeek(),
            );
        } elseif ($method === 'onTheAir') {
            $this->getSeriesAiringBetween(
                $this->getTitleBuilder($filters),
                Carbon::now(),
                Carbon::now()->addWeek(),
            );
        } elseif ($method === 'airingToday') {
            return $this->getSeriesAiringBetween(
                $this->getTitleBuilder($filters),
                Carbon::now(),
                Carbon::now()->addDay(),
            );
        } elseif ($method === 'latestVideos') {
            return $this->getTitleBuilder($filters)
                ->join('videos', 'titles.id', '=', 'videos.title_id')
                ->where('videos.origin', 'local')
                ->where('approved', true)
                ->orderBy('videos.created_at', 'desc')
                ->limit(20)
                ->get();
        } elseif ($method === 'lastAdded') {
            return $this->getTitleBuilder($filters)
                ::where('is_series', $isSeries)
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get();
        }
    }

    private function getTopRatedTitles(mixed $builder, $isSeries): Collection
    {
        $ratingCol = config('common.site.rating_column');

        $query = $builder->where('is_series', $isSeries);

        if (Str::contains($ratingCol, 'tmdb_vote_average')) {
            $query->orderBy(DB::raw('tmdb_vote_count > 100'), 'desc');
        }

        return $query
            ->orderBy($ratingCol, 'desc')
            ->limit(20)
            ->get();
    }

    private function getMoviesReleasingBetween(
        mixed $builder,
        $from,
        $to,
    ): Collection {
        return $builder
            ->whereBetween('release_date', [$from, $to])
            ->orderBy('popularity', 'desc')
            ->limit(20)
            ->where('is_series', false)
            ->get(['id', 'name']);
    }

    private function getSeriesAiringBetween(
        mixed $builder,
        $from,
        $to,
    ): Collection {
        $titleIds = Episode::whereBetween('release_date', [$from, $to])
            ->limit(300)
            ->get(['title_id'])
            ->pluck('title_id')
            ->unique()
            ->slice(0, 20);

        return $builder->whereIn('id', $titleIds)->get(['id', 'name']);
    }

    private function getTitleBuilder(?array $filters = []): mixed
    {
        if (isset($filters['keyword'])) {
            return Keyword::findOrFail($filters['keyword'])->titles();
        } elseif (isset($filters['genre'])) {
            return Genre::findOrFail($filters['genre'])->titles();
        } elseif (isset($filters['country'])) {
            return ProductionCountry::findOrFail($filters['country'])->titles();
        } else {
            return Title::query();
        }
    }
}
