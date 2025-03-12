<?php

namespace App\Actions\Lists;

use App\Models\Channel;
use App\Models\User;
use Common\Database\Datasource\Datasource;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ListsLoader
{
    public function forUser(User $user, array $params): AbstractPaginator
    {
        $builder = $user->lists();

        if (Auth::id() !== $user->id) {
            $builder->where('public', true)->where('internal', false);
        }

        $pagination = (new Datasource($builder, $params))->paginate();

        $pagination
            ->loadCount('items')
            ->load([
                'items' => fn($query) => $query
                    ->orderBy('order')
                    ->where('order', '<=', 4)
                    ->compact(),
            ])
            ->transform(function (Channel $list) {
                $list->description = Str::limit($list->description, 80);
                return $list;
            });

        return $pagination;
    }

    public function allLists(array $params): AbstractPaginator
    {
        $builder = Channel::where('type', 'list')
            ->where('internal', false)
            ->with('user');

        $pagination = (new Datasource($builder, $params))->paginate();

        $pagination->loadCount('items');
        $pagination->transform(function (Channel $list) {
            $list->description = Str::limit($list->description, 80);
            return $list;
        });

        return $pagination;
    }
}
