<?php

namespace App\Actions\Titles\Retrieve;

use App\Models\Title;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Arr;

class PaginateTitleSeasons
{
    public function execute(Title $title, array $params = []): AbstractPaginator
    {
        return $title
            ->seasons()
            ->select([
                'seasons.id',
                'seasons.poster',
                'seasons.release_date',
                'number',
                'title_id',
            ])
            ->withCount('episodes')
            ->orderBy('number', 'desc')
            ->paginate(Arr::get($params, 'perPage', 8));
    }
}
