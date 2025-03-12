<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Auth;
use Common\Core\BaseController;
use Illuminate\Database\Eloquent\Builder;

class VideoReportController extends BaseController
{
    public function report(Video $video)
    {
        $userId = Auth::id();
        $userIp = $this->request->ip();

        // if we can't match current user, bail
        if ( ! $userId && ! $userIp) return null;

        $alreadyReported = $video->reports()
            ->where(function(Builder $query) use($userId, $userIp) {
                $query->where('user_id', $userId)->orWhere('user_ip', $userIp);
            })->first();

        if ($alreadyReported) {
            return $this->error(__('You have already reported this video.'));
        } else {
            $report = $video->reports()->create([
                'user_id' => $userId,
                'user_ip' => $userIp
            ]);
            return $this->success(['report' => $report]);
        }
    }
}
