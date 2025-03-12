<?php

namespace App\Actions\Titles\Retrieve;

use App\Models\Title;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class PaginateSeasonEpisodes
{
    public function execute(
        Title $title,
        int $seasonNumber,
        array $params = [],
    ): AbstractPaginator {
        $builder = $title->episodes()->where('season_number', $seasonNumber);
        $builder->with(['primaryVideo']);

        $orderBy = Arr::get($params, 'orderBy', 'episode_number');
        $orderDir = Arr::get($params, 'orderDir', 'asc');

        $pagination = $builder
            ->orderBy($orderBy, $orderDir)
            ->simplePaginate(Arr::get($params, 'perPage', 30));

        // only show first paragraph of description
        $pagination->through(function ($episode) use ($params) {
            $episode->description = explode("\n", $episode->description)[0];
            if (Arr::get($params, 'excludeDescription')) {
                $episode->description = null;
            } elseif (Arr::get($params, 'truncateDescriptions')) {
                $episode->description = Str::limit($episode->description, 200);
            }
            return $episode;
        });

        return $pagination;
    }
}
