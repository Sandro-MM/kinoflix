<?php

namespace App\Actions\People;

use App\Models\Person;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class PaginatePeople
{
    public function execute(array $params, $builder = null): AbstractPaginator
    {
        $builder = $builder ?? Person::query();
        $isCompact = Arr::get($params, 'compact');

        if ($isCompact) {
            $builder->select([
                'id',
                'name',
                'birth_date',
                'death_date',
                'poster',
                'popularity',
            ]);
        }

        $datasource = new Datasource($builder, $params);

        // prevent duplicate items when ordering by columns that are not
        // guaranteed to be unique (name, popularity, age etc.)
        $datasource->secondaryOrderCol = 'id';

        if (!Arr::get($params, 'order') && !Arr::get($params, 'orderBy')) {
            $datasource->order = [
                'col' => 'popularity',
                'dir' => 'desc',
            ];
        }

        if (
            $datasource->getOrder()['col'] === 'popularity' &&
            ($min = config('content.people_index_min_popularity'))
        ) {
            $builder->where('popularity', '>', $min);
        }

        $pagination = $datasource->paginate();

        if (!$isCompact) {
            $pagination->transform(function (Person $person) {
                $person->description = Str::limit($person->description, 500);
                return $person;
            });

            //app(LoadPrimaryCredit::class)->execute($pagination);
        }

        return $pagination;
    }
}
