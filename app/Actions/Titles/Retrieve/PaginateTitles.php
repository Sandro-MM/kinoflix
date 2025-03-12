<?php

namespace App\Actions\Titles\Retrieve;

use App\Models\Title;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PaginateTitles
{
    public function execute(array $params, $builder = null): AbstractPaginator
    {
        if (!$builder) {
            $builder = Title::query();
        }

        if ($type = Arr::get($params, 'type')) {
            $builder->where('is_series', $type === 'series');
        }

        $builder->with(['primaryVideo']);

        $datasource = new Datasource($builder, $params);

        // prevent duplicate items when ordering by columns that are not
        // guaranteed to be unique (budget, popularity , revenue etc.)
        $datasource->secondaryOrderCol = 'id';

        // only show titles with more than 50 votes when filtering by rating
        if ($datasource->filters->has('tmdb_vote_average')) {
            $builder->where('tmdb_vote_count', '>=', 50);
        }

        $order = $datasource->getOrder();

        $order['col'] = str_replace(
            ['user_score', 'rating'],
            config('common.site.rating_column'),
            $order['col'],
        );

        // show titles with less than 50 votes on tmdb last, regardless of their average
        if (Str::contains($order['col'], 'tmdb_vote_average')) {
            $builder->orderBy(DB::raw('tmdb_vote_count > 100'), 'desc');
        }

        $datasource->order = $order;

        return $datasource->paginate();
    }
}
