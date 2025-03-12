<?php

namespace App\Actions\Reviews;

use App\Models\Review;
use Illuminate\Support\Facades\DB;

class UpdateReviewableAverageScore
{
    public function execute(int $reviewableId, string $reviewableType): void
    {
        $votes = app(Review::class)
            ->where('reviewable_type', $reviewableType)
            ->where('reviewable_id', $reviewableId)
            ->select(
                DB::raw('avg(`score`) as average'),
                DB::raw('count(*) as count'),
            )
            ->first();


        $average = number_format((float) $votes['average'], 1);

        // title or episode
        $model = app(modelTypeToNamespace($reviewableType))->find(
            $reviewableId,
        );
        $model->local_vote_average = $average;
        $model->local_vote_count = $votes['count'];
        $model->save();
    }
}
