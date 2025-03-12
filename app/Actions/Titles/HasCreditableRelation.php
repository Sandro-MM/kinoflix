<?php

namespace App\Actions\Titles;

use App\Models\Person;
use DB;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasCreditableRelation
{
    public function credits(): BelongsToMany
    {
        $query = $this->morphToMany(Person::class, 'creditable')->withPivot([
            'id',
            'job',
            'department',
            'order',
            'character',
        ]);

        $query = $query->select(['people.id', 'name', 'poster']);

        // order by department first, so we always get director,
        // writers and creators, even if limit is applied to this query
        $prefix = DB::getTablePrefix();
        return $query
            ->orderBy(
                DB::raw(
                    "FIELD(department, 'directing', 'creators', 'writing', 'actors')",
                ),
            )
            // should be "desc" and not "asc" because "minus" is added which will reverse order
            ->orderBy(DB::raw("-{$prefix}creditables.order"), 'desc');
    }

    public function updateCredit(int $pivotId, array $payload): void
    {
        // lowercase payload
        $payload = collect($payload)
            ->mapWithKeys(function ($value, $key) {
                if ($key === 'department' || $key === 'job') {
                    $value = strtolower($value);
                }
                return [$key => $value];
            })
            ->toArray();

        $this->credits()
            ->newPivotQuery()
            ->where('id', $pivotId)
            ->update($payload);
    }

    public function createCredit(array $payload): void
    {
        // lowercase payload
        $payload = collect($payload)
            ->mapWithKeys(function ($value, $key) {
                if ($key === 'department' || $key === 'job') {
                    $value = strtolower($value);
                }
                return [$key => $value];
            })
            ->toArray();

        if ($payload['department'] === 'actors') {
            $payload['order'] =
                $this->credits()
                    ->wherePivot('department', 'actors')
                    ->count() + 1;
        }

        $this->credits()->attach($payload['person_id'], $payload);
    }
}
