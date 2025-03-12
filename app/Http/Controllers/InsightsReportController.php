<?php

namespace App\Http\Controllers;

use App\Actions\Plays\BuildPlaysReport;
use Common\Core\BaseController;

class InsightsReportController extends BaseController
{
    public function __construct()
    {
        // will authorize based on specified model in "BuildInsightsReport"
        $this->middleware('auth');
    }

    public function __invoke()
    {
        $report = app(BuildPlaysReport::class)->execute(
            request()->all(),
        );

        return $this->success(['report' => $report]);
    }
}
