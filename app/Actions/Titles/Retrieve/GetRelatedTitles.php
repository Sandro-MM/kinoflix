<?php

namespace App\Actions\Titles\Retrieve;

use App\Models\Title;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class GetRelatedTitles
{
    public function execute(Title $title, array $params = []): Collection
    {
        $titleIds = $this->getByTags($title, $params);

        if ($titleIds->isNotEmpty()) {
            return Title::whereIn('id', $titleIds)
                ->with(['primaryVideo'])
                ->when(isset($params['compact']), fn($q) => $q->compact())
                ->get();
        }

        return collect();
    }

    private function getByTags(Title $title, array $params): Collection
    {
        $prefix = DB::getTablePrefix();
        $keywordIds = $title->keywords->pluck('id');
        $genreIds = $title->genres->pluck('id');

        return DB::table('titles')
            ->join('keyword_title as k', 'k.title_id', '=', 'titles.id')
            ->join('genre_title as g', 'g.title_id', '=', 'titles.id')
            ->select(
                DB::raw(
                    "{$prefix}titles.id, COUNT({$prefix}k.id) + COUNT({$prefix}g.id) as total_count",
                ),
            )
            ->whereIn('k.keyword_id', $keywordIds)
            ->whereIn('g.genre_id', $genreIds)
            ->when($title->release_date, function ($q) use ($title) {
                $q->whereBetween('release_date', [
                    $title->release_date->subYears(5)->format('Y-m-d'),
                    $title->release_date->addYears(5)->format('Y-m-d'),
                ]);
            })
            ->where('titles.id', '!=', $title->id)
            ->groupBy('titles.id')
            ->orderBy('total_count', 'desc')
            ->limit(Arr::get($params, 'limit', 10))
            ->pluck('titles.id');
    }
}
