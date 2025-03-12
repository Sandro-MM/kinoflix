<?php

namespace App\Actions\Titles;

use App\Models\Person;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

trait InsertsTmdbTitleOrPerson
{
    public function insertOrRetrieve(Collection $tmdbItems): Collection
    {
        $tmdbItems = $tmdbItems->map(function ($value) {
            unset($value['relation_data']);
            unset($value['model_type']);
            unset($value['id']);
            return $value;
        });

        $select =
            static::class === Person::class
                ? ['id', 'tmdb_id', 'name']
                : ['id', 'tmdb_id', 'name', 'is_series'];

        $existing = $this->withoutGlobalScope('adult')
            ->select($select)
            ->whereIn('tmdb_id', $tmdbItems->pluck('tmdb_id'))
            ->get()
            ->mapWithKeys(fn($item) => [$item['tmdb_id'] => $item]);

        $new = $tmdbItems
            ->filter(fn($item) => !isset($existing[$item['tmdb_id']]))
            ->values();

        if ($new->isNotEmpty()) {
            $new->transform(function ($item) {
                $item['created_at'] = Arr::get(
                    $item,
                    'created_at',
                    Carbon::now(),
                );
                return $item;
            });
            $this->insert($new->toArray());
            return $this->whereIn('tmdb_id', $tmdbItems->pluck('tmdb_id'))
                ->select($select)
                ->get();
        } else {
            return $existing;
        }
    }
}
