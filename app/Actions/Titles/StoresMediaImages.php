<?php

namespace App\Actions\Titles;

use App\Models\Person;
use App\Models\Title;

trait StoresMediaImages
{
    public function storeImages(array $values, Title|Person $model): void
    {
        $values = array_map(function ($value) use ($model) {
            $value['model_id'] = $model->id;
            $value['model_type'] = $model->getMorphClass();
            return $value;
        }, $values);

        $model
            ->images()
            ->where('source', '!=', 'local')
            ->delete();
        $model->images()->insert($values);
    }
}
