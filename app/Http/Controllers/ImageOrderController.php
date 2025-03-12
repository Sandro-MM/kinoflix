<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Common\Core\BaseController;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ImageOrderController extends BaseController
{
    public function __construct(private Title $title, private Request $request)
    {
    }

    /**
     * @param int $titleId
     * @return JsonResponse
     */
    public function changeOrder($titleId) {

        $title = $this->title->findOrFail($titleId);

        $this->authorize('update', $title);

        $this->validate($this->request, [
            'ids'   => 'array|min:1',
            'ids.*' => 'integer'
        ]);

        $queryPart = '';
        foreach($this->request->get('ids') as $order => $id) {
            $queryPart .= " when id=$id then $order";
        }

        DB::table('images')
            ->whereIn('id', $this->request->get('ids'))
            ->update(['order' => DB::raw("(case $queryPart end)")]);

        return $this->success();
    }
}
