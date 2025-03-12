<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use App\Models\Season;
use App\Models\Title;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class TitleCreditsController extends BaseController
{
    public function index(Title $title)
    {
        $this->authorize('show', $title);

        $model = $this->resolveCreditableModel($title, request()->all());

        $builder = $model->credits();

        if (request('crewOnly')) {
            $builder->wherePivot('department', '!=', 'actors');
        }

        if ($department = request('department')) {
            $builder->wherePivot('department', $department);
        }

        $datasource = new Datasource($builder, request()->all());
        $datasource->order = false;

        return $this->success(['pagination' => $datasource->paginate()]);
    }

    public function update(Title $title, int $pivotId)
    {
        $this->authorize('update', $title);

        $data = $this->validate(request(), [
            'character' => 'string|nullable',
            'department' => 'string|nullable',
            'job' => 'string|nullable',
        ]);

        $model = $this->resolveCreditableModel($title, request()->all());
        $model->updateCredit($pivotId, $data);

        return $this->success();
    }

    public function store(Title $title)
    {
        $this->authorize('update', $title);

        $data = $this->validate(request(), [
            'person_id' => 'required|integer|exists:people,id',
            'character' => 'required_if:department,cast|string',
            'department' => 'required|string',
            'job' => 'string|nullable',
        ]);

        $model = $this->resolveCreditableModel($title, request()->all());
        $model->createCredit($data);

        return $this->success();
    }

    public function destroy(Title $title, int $pivotId)
    {
        $this->authorize('update', $title);

        $model = $this->resolveCreditableModel($title, request()->all());
        $model
            ->credits()
            ->wherePivot('id', $pivotId)
            ->detach();

        return $this->success();
    }

    public function changeOrder()
    {
        $this->authorize('update', Title::class);

        $data = $this->validate(request(), [
            'ids' => 'array|min:1',
            'ids.*' => 'integer',
        ]);

        $queryPart = '';
        foreach ($data['ids'] as $order => $id) {
            $queryPart .= " when id=$id then $order";
        }

        DB::table('creditables')
            ->whereIn('id', $data['ids'])
            ->update(['order' => DB::raw("(case $queryPart end)")]);

        return $this->success();
    }

    public function resolveCreditableModel(
        Title $title,
        array $params,
    ): Title|Season|Episode {
        if (Arr::get($params, 'season') && Arr::get($params, 'episode')) {
            return $title->findEpisode($params['season'], $params['episode']);
        } elseif (Arr::get($params, 'season')) {
            return $title->findSeason($params['season']);
        }
        return $title;
    }
}
