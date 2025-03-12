<?php

namespace App\Http\Controllers;

use App\Loaders\ReviewsLoader;
use Common\Core\BaseController;

class ReviewableController extends BaseController
{
    public function index()
    {
        $data = (new ReviewsLoader())->loadData([
            'reviewableType' => request('reviewable_type'),
            'reviewableId' => request('reviewable_id'),
            'page' => request('page'),
            'orderBy' => request('orderBy'),
            'orderDir' => request('orderDir'),
            'perPage' => request('perPage'),
        ]);

        if (!$data) {
            abort(404);
        }

        $this->authorize('show', $data['reviewable']);

        return $this->success($data);
    }
}
