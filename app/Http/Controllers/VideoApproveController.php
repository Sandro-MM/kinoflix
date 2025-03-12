<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Common\Core\BaseController;

class VideoApproveController extends BaseController
{
    public function approve(Video $video)
    {
        $this->authorize('update', $video);

        $video->update(['approved' => true]);

        return $this->success(['video' => $video]);
    }

    public function disapprove(Video $video)
    {
        $this->authorize('update', $video);

        $video->update(['approved' => false]);

        return $this->success(['video' => $video]);
    }
}
