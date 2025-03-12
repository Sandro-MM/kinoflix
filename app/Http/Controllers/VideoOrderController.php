<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Common\Core\BaseController;
use Illuminate\Support\Facades\DB;

class VideoOrderController extends BaseController
{
    public function changeOrder(int $titleId)
    {
        $title = Title::findOrFail($titleId);

        $this->authorize('update', $title);

        request()->validate([
            'ids' => 'array|min:1',
            'ids.*' => 'integer',
        ]);

        $queryPart = '';
        foreach (request('ids') as $order => $id) {
            $queryPart .= " when id=$id then $order";
        }

        DB::table('videos')
            ->whereIn('id', request('ids'))
            ->update(['order' => DB::raw("(case $queryPart end)")]);

        return $this->success();
    }
}
