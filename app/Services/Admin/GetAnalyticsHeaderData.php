<?php

namespace App\Services\Admin;

use App\Models\Review;
use App\Models\User;
use App\Models\VideoPlay;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Comments\Comment;
use Common\Database\Metrics\MetricDateRange;
use Common\Database\Metrics\ValueMetric;

class GetAnalyticsHeaderData implements GetAnalyticsHeaderDataAction
{
    public function execute(array $params): array
    {
        $dateRange = new MetricDateRange(
            start: $params['startDate'] ?? null,
            end: $params['endDate'] ?? null,
            timezone: $params['timezone'] ?? null,
        );

        return [
            array_merge(
                [
                    'name' => __('New users'),
                ],
                (new ValueMetric(
                    User::query(),
                    dateRange: $dateRange,
                ))->count(),
            ),

            array_merge(
                [
                    'name' => __('New ratings'),
                ],
                (new ValueMetric(
                    Review::query(),
                    dateRange: $dateRange,
                ))->count(),
            ),
            array_merge(
                [
                    'name' => __('Video plays'),
                ],
                (new ValueMetric(
                    VideoPlay::query(),
                    dateRange: $dateRange,
                ))->count(),
            ),

            array_merge(
                [
                    'name' => __('New comments'),
                ],
                (new ValueMetric(
                    Comment::query(),
                    dateRange: $dateRange,
                ))->count(),
            ),
        ];
    }
}
