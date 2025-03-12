<?php

namespace App\Loaders;

use App\Models\Review;
use Illuminate\Support\Arr;

class ReviewsLoader
{
    public function loadData(array $params): ?array
    {
        $modelType = Arr::get($params, 'reviewableType');
        $modelId = Arr::get($params, 'reviewableId');

        if (!$modelType || !$modelId) {
            return null;
        }

        $reviewable = app(modelTypeToNamespace($modelType))->find($modelId);
        if (!$reviewable) {
            return null;
        }

        $sharedReviewId = request('sharedReviewId');
        $page = (int) ($params['page'] ?? 1);
        $orderBy = $params['orderBy'] ?? 'created_at';
        $orderDir = $params['orderDir'] ?? 'desc';

        $response = [
            'reviewable' => $reviewable,
        ];

        $response['pagination'] = Review::forReviewable($reviewable)
            ->with([
                'user',
                'feedback' => fn($q) => $q->where('user_id', auth()->id()),
                'reports' => fn($q) => $q
                    ->where('user_id', auth()->id())
                    ->orWhere('user_ip', getIp()),
            ])
            ->withTextOnly()
            ->when(
                $orderBy === 'mostHelpful',
                fn($q) => $q->orderByMostHelpful(),
                fn($q) => $q->orderBy($orderBy, $orderDir),
            )
            ->paginate($params['perPage'] ?? 10)
            ->through(function ($review) {
                if ($feedback = $review->feedback->first()) {
                    $review->current_user_feedback = $feedback->is_helpful;
                }
                if ($review->reports->first()) {
                    $review->current_user_reported = true;
                }
                $review->unsetRelation('feedback');
                $review->unsetRelation('reports');
                return $review;
            });

        $response['current_user_review'] =
            $page === 1
                ? $reviewable
                    ->reviews()
                    ->where('user_id', auth()->id())
                    ->first()
                : null;

        $response['shared_review'] =
            $sharedReviewId && $page === 1
                ? $reviewable
                    ->reviews()
                    ->find($sharedReviewId)
                    ?->load('user')
                : null;

        return $response;
    }
}
