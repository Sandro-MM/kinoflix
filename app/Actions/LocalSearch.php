<?php

namespace App\Actions;

use App\Actions\People\LoadPrimaryCredit;
use App\Models\Person;
use App\Models\Title;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class LocalSearch
{
    public function execute(string $query, array $params = []): Collection
    {
        $titles = collect();
        $people = collect();

        if (Arr::get($params, 'type') !== 'person') {
            $titles = Title::search($query)
                ->take(20)
                ->get();

            if ($with = Arr::get($params, 'with')) {
                $with = array_filter(explode(',', $with));
                $titles->load($with);
            }
        }

        if (Arr::get($params, 'type') !== 'title') {
            $people = Person::search($query)
                ->take(20)
                ->get();
            app(LoadPrimaryCredit::class)->execute($people);
        }

        return $titles
            ->concat($people)
            ->slice(0, Arr::get($params, 'limit', 8))
            ->values();
    }
}
