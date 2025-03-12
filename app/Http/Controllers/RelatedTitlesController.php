<?php

namespace App\Http\Controllers;

use App\Actions\Titles\Retrieve\GetRelatedTitles;
use App\Models\Title;
use Common\Core\BaseController;

class RelatedTitlesController extends BaseController
{
    public function index(int $id)
    {
        $this->authorize('index', Title::class);

        $title = Title::with('keywords', 'genres')->findOrFail($id);

        $related = app(GetRelatedTitles::class)->execute(
            $title,
            request()->all(),
        );

        return $this->success(['titles' => $related]);
    }
}
