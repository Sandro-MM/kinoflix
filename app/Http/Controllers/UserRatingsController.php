<?php

namespace App\Http\Controllers;

use Common\Core\BaseController;
use Illuminate\Support\Facades\Auth;

class UserRatingsController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function __invoke()
    {
        $ratings = Auth::user()
            ->reviews()
            ->select(['id', 'reviewable_id', 'reviewable_type', 'score'])
            ->limit(1000)
            ->get()
            ->map(
                fn($review) => [
                    'id' => $review->id,
                    'score' => $review->score,
                    'reviewable_id' => $review->reviewable_id,
                    'type' => $review->reviewable_type,
                ],
            )
            ->groupBy('type')
            ->map(
                fn($group) => $group
                    ->mapWithKeys(
                        fn($item) => [
                            $item['reviewable_id'] => [
                                'id' => $item['id'],
                                'score' => $item['score'],
                            ],
                        ],
                    )
                    ->all(),
            );

        return $this->success(['ratings' => $ratings]);
    }
}
