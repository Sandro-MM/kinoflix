<?php

namespace App\Actions\People;

use App\Models\Title;
use Illuminate\Database\QueryException;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class LoadPrimaryCredit
{
    public function execute(Collection|AbstractPaginator $people): void
    {
        $prefix = DB::getTablePrefix();
        $titleSelect = Title::select([
            'titles.id',
            'titles.is_series',
            'titles.name',
            DB::raw("{$prefix}creditables.person_id as pivot_person_id"),
            DB::raw(
                "{$prefix}creditables.creditable_id as pivot_creditable_id",
            ),
            DB::raw(
                "{$prefix}creditables.creditable_type as pivot_creditable_type",
            ),
            DB::raw("{$prefix}creditables.job as pivot_job"),
            DB::raw("{$prefix}creditables.department as pivot_department"),
            DB::raw(
                "row_number() over (partition by {$prefix}creditables.person_id order by {$prefix}titles.popularity desc) as laravel_row",
            ),
        ])
            ->join('creditables', 'titles.id', '=', 'creditables.creditable_id')
            ->where('creditables.creditable_type', Title::MODEL_TYPE)
            ->whereIn('creditables.person_id', $people->pluck('id'))
            // this scope will mess up binding merging below
            ->withoutGlobalScope('adult')
            ->when(
                !config('tmdb.includeAdult'),
                fn($q) => $q->where('adult', false),
            );

        // cache syntax error, if mysql version does not support partition
        try {
            $items = DB::table(
                DB::raw("({$titleSelect->toSql()}) as laravel_table"),
            )
                ->select('*')
                ->mergeBindings($titleSelect->getQuery())
                ->where('laravel_row', '<=', 1)
                ->orderBy('laravel_row')
                ->get();
        } catch (QueryException $e) {
            return;
        }

        $credits = Title::hydrate($items->toArray());

        $people->each(function ($person) use ($credits) {
            $credit = $credits->first(
                fn($credit) => $credit->pivot_person_id === $person->id,
            );
            if ($credit) {
                $person->primary_credit = [
                    'id' => $credit->id,
                    'is_series' => $credit->is_series,
                    'name' => $credit->name,
                    'year' => $credit->year,
                    'model_type' => $credit->model_type,
                ];
            }
        });
    }
}
