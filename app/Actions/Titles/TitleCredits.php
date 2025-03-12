<?php

namespace App\Actions\Titles;

use App\Models\Episode;
use App\Models\Person;
use App\Models\Season;
use App\Models\Title;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class TitleCredits
{
    public function loadCompact(
        Title $title,
        Season $season = null,
        Episode $episode = null,
    ): Collection {
        $builder = $this->getBaseQuery($title, $season, $episode)
            ->whereIn('creditables.department', [
                'actors',
                'writing',
                'directing',
                'creators',
            ])
            ->limit(50);

        $credits = $this->groupByDepartment($builder);

        if (isset($credits['actors'])) {
            $credits['actors'] = $credits['actors']->take(15)->values();
        }
        if (isset($credits['writing'])) {
            $credits['writing'] = $credits['writing']->take(3)->values();
        }
        if (isset($credits['directing'])) {
            $credits['directing'] = $credits['directing']
                ->filter(fn($c) => $c['pivot']['job'] === 'director')
                ->take(3)
                ->values();
        }
        if (isset($credits['creators'])) {
            $credits['creators'] = $credits['creators']->take(3)->values();
        }

        return $credits;
    }

    public function loadFull(
        Title $title,
        Season $season = null,
        Episode $episode = null,
    ): Collection {
        $builder = $this->getBaseQuery($title, $season, $episode);
        return $this->groupByDepartment($builder);
    }

    protected function getBaseQuery(
        Title $title = null,
        Season $season = null,
        Episode $episode = null,
    ): Builder {
        $prefix = DB::getTablePrefix();
        $builder = Person::join(
            'creditables',
            'people.id',
            '=',
            'creditables.person_id',
        )
            ->select([
                'people.id',
                'people.name',
                'people.poster',
                DB::raw("{$prefix}creditables.id as pivot_id"),
                DB::raw(
                    "{$prefix}creditables.creditable_id as pivot_creditable_id",
                ),
                DB::raw(
                    "{$prefix}creditables.creditable_type as pivot_creditable_type",
                ),
                DB::raw("{$prefix}creditables.job as pivot_job"),
                DB::raw("{$prefix}creditables.department as pivot_department"),
                DB::raw("{$prefix}creditables.order as pivot_order"),
                DB::raw("{$prefix}creditables.character as pivot_character"),
            ])
            // Need to keep same person in different departments (as actor and producer for example)
            // while still removing duplicates when loading credits for title, season and episode
            ->groupBy(['people.id', 'creditables.department']);

        $builder->where(function ($q) use ($title, $season, $episode) {
            if ($title) {
                $q->orWhere(
                    fn($q) => $q
                        ->where('creditables.creditable_id', $title->id)
                        ->where(
                            'creditables.creditable_type',
                            $title->getMorphClass(),
                        ),
                );
            }

            if ($episode) {
                $q->orWhere(
                    fn($q) => $q
                        ->where('creditables.creditable_id', $episode->id)
                        ->where(
                            'creditables.creditable_type',
                            $episode->getMorphClass(),
                        ),
                );
            }

            if ($season) {
                $q->orWhere(
                    fn($q) => $q
                        ->where('creditables.creditable_id', $season->id)
                        ->where(
                            'creditables.creditable_type',
                            $season->getMorphClass(),
                        ),
                );
            }
        });

        // order by department first, so we always get director,
        // writers and creators, even if limit is applied to this query
        $prefix = DB::getTablePrefix();
        return $builder
            ->orderBy(
                DB::raw(
                    "FIELD(department, 'directing', 'creators', 'writing', 'actors')",
                ),
            )
            // should be "desc" and not "asc" because "minus" is added which will reverse order
            ->orderBy(DB::raw("-{$prefix}creditables.order"), 'desc');
    }

    protected function groupByDepartment(Builder $builder): Collection
    {
        $credits = $builder->get()->map(function ($credit) {
            $credit->pivot = [
                'id' => $credit->pivot_id,
                'job' => $credit->pivot_job,
                'department' => $credit->pivot_department,
                'character' => $credit->pivot_character,
            ];

            unset(
                $credit->pivot_id,
                $credit->pivot_creditable_id,
                $credit->pivot_creditable_type,
                $credit->pivot_job,
                $credit->pivot_department,
                $credit->pivot_order,
                $credit->pivot_character,
            );

            return $credit;
        });

        return $credits->groupBy('pivot.department');
    }
}
