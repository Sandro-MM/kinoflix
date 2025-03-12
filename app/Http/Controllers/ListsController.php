<?php

namespace App\Http\Controllers;

use App\Actions\Lists\ListsLoader;
use App\Models\Channel;
use Common\Core\BaseController;

class ListsController extends BaseController
{
    public function index()
    {
        $this->authorize('index', [Channel::class, 'list']);

        $pagination = (new ListsLoader())->allLists(request()->all());

        return $this->success(['pagination' => $pagination]);
    }
}
