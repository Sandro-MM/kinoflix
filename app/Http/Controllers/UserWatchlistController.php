<?php

namespace App\Http\Controllers;

use Common\Core\BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserWatchlistController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function __invoke()
    {
        $list = Auth::user()
            ->watchlist()
            ->firstOrFail();

        $items = DB::table('channelables')
            ->where('channel_id', $list->id)
            ->pluck('channelable_type', 'channelable_id')
            ->map(
                fn($modelType, $itemId) => [
                    'id' => $itemId,
                    'type' => $modelType,
                ],
            )
            ->groupBy('type')
            ->map(
                fn($group) => $group->mapWithKeys(
                    fn($item) => [
                        $item['id'] => true,
                    ],
                ),
            );

        return $this->success([
            'watchlist' => [
                'id' => $list->id,
                'items' => $items,
            ],
        ]);
    }
}
