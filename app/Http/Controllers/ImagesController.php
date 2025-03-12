<?php

namespace App\Http\Controllers;

use App\Actions\Titles\StoreMediaImageOnDisk;
use App\Models\Image;
use App\Models\Title;
use Common\Core\BaseController;
use Storage;

class ImagesController extends BaseController
{
    public function store()
    {
        $titleId = request('titleId');
        $model = app(Title::class)->findOrFail($titleId);

        $this->authorize('store', $model);

        $this->validate(request(), [
            'file' => 'required|image|max:10240',
            'titleId' => 'required|integer',
        ]);

        $url = app(StoreMediaImageOnDisk::class)->execute(
            request()->file('file'),
        );

        // put new image at the start of the list when sorted by "order"
        Image::where('model_type', Title::MODEL_TYPE)
            ->where('model_id', $titleId)
            ->increment('order');

        $image = Image::create([
            'url' => $url,
            'type' => 'backdrop',
            'source' => 'local',
            'model_type' => Title::MODEL_TYPE,
            'model_id' => $titleId,
            'order' => 0,
        ]);

        return $this->success(['image' => $image]);
    }

    public function destroy(int $id)
    {
        $img = Image::findOrFail($id);
        $model = app(modelTypeToNamespace($img->model_type))->findOrFail(
            $img->model_id,
        );

        $this->authorize('destroy', $model);

        if ($img->source === 'local') {
            // storage/media-images/backdrops/kw4q4eg5g8q4eq6/original.jpg
            $dir = str_replace('storage/', '', dirname($img->url));
            if (Storage::disk('public')->exists($dir)) {
                Storage::disk('public')->deleteDirectory($dir);
            }
        }

        $img->delete();

        return $this->success();
    }
}
