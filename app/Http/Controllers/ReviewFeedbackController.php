<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Common\Core\BaseController;

class ReviewFeedbackController extends BaseController
{
    public function store(Review $review)
    {
        $this->authorize('show', $review);

        $data = $this->validate(request(), [
            'is_helpful' => 'required|boolean',
        ]);
        $isHelpful = $data['is_helpful'];

        $review->feedback()->updateOrCreate(
            [
                'user_id' => auth()->id(),
            ],
            [
                'is_helpful' => $isHelpful,
            ],
        );

        $review->timestamps = false;

        if ($isHelpful) {
            $review->increment('helpful_count');
            if ($review->not_helpful_count > 0) {
                $review->decrement('not_helpful_count');
            }
        } else {
            if ($review->helpful_count > 0) {
                $review->decrement('helpful_count');
            }
            $review->increment('not_helpful_count');
        }

        return $this->success(['review' => $review->load('feedback')]);
    }
}
