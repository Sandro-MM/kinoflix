<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;

class AdminTitleTagsController extends BaseController
{
    public function index(string $tagType)
    {
        $this->authorize('index', Title::class);

        $builder = app(modelTypeToNamespace($tagType))->newQuery();

        $dataSource = new Datasource($builder, request()->all());

        $pagination = $dataSource->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function store(string $type) {
        $this->authorize('store', Title::class);

        $data = $this->validate(request(), [
            'name' => 'required|string',
            'display_name' => 'string',
        ]);

        $tag = app(modelTypeToNamespace($type))->create($data);

        return $this->success(['tag' => $tag]);
    }

    public function update(string $type, int $tagId) {
        $this->authorize('update', Title::class);

        $data = $this->validate(request(), [
            'name' => 'string',
            'display_name' => 'string',
        ]);

        $tag = app(modelTypeToNamespace($type))->findOrFail($tagId);

        $tag->update($data);

        return $this->success(['tag' => $tag]);
    }

    public function destroy($type, string $ids)
    {
        $tagIds = explode(',', $ids);
        $this->authorize('destroy', Title::class);

        foreach ($tagIds as $tagId) {
            $tag = app(modelTypeToNamespace($type))->findOrFail($tagId);
            $tag->titles()->detach();
            $tag->delete();
        }

        return $this->success();
    }
}
