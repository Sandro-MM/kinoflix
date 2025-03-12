<?php

namespace App\Http\Controllers;

use App\Actions\Reviews\UpdateReviewableAverageScore;
use App\Models\Review;
use Auth;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Str;

class ReviewController extends BaseController
{
    public function index()
    {
        $this->authorize('index', Review::class);

        $builder = Review::withCount('reports')->withTextOnly();

        // will need to specify this outside of filters on edit title reviews page
        if (request('reviewable_id') && request('reviewable_type')) {
            $reviewable = app(
                modelTypeToNamespace(request('reviewable_type')),
            )->findOrFail(request('reviewable_id'));
            $builder->forReviewable($reviewable);
        } else {
            $builder->where('reviewable_id', '>', 0);
        }

        $datasource = new Datasource($builder, request()->all());
        $order = $datasource->getOrder();

        if (Str::endsWith($order['col'], 'mostHelpful')) {
            $datasource->order = false;
            $builder->orderByMostHelpful();
        }

        $pagination = $datasource->paginate()->through(function ($review) {
            if ($review->relationLoaded('reviewable') && $review->reviewable) {
                $normalized = $review->reviewable->toNormalizedArray();
                $review->unsetRelation('reviewable');
                $review->setAttribute('reviewable', $normalized);
            }
            return $review;
        });

        return $this->success(['pagination' => $pagination]);
    }

    public function update($id)
    {
        $review = Review::findOrFail($id);

        $this->authorize('update', $review);

        $data = request()->all();

        if (isset($data['body'])) {
            $data['has_text'] = true;
        }

        $review->fill($data)->save();

        app(UpdateReviewableAverageScore::class)->execute(
            $review->reviewable_id,
            $review->reviewable_type,
        );

        return $this->success(['review' => $review]);
    }

    public function store()
    {
        $this->authorize('store', Review::class);

        $data = $this->validate(request(), [
            'reviewable_id' => 'required|integer',
            'reviewable_type' => 'required|string',
            'title' => 'string|min:10|max:150',
            'body' => 'string|min:100|max:5000',
            'score' => 'required|integer|min:1|max:10',
        ]);

        $reviewableId = $data['reviewable_id'];
        $reviewableType = $data['reviewable_type'];

        $values = [
            'score' => request('score'),
        ];

        // don't override review body or title when only score changes
        if (request('body')) {
            $values['body'] = request('body');
            $values['has_text'] = true;
        }
        if (request('title')) {
            $values['title'] = request('title');
        }

        $review = Review::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'reviewable_type' => $reviewableType,
                'reviewable_id' => $reviewableId,
            ],
            $values,
        );

        $review->load('user');
        app(UpdateReviewableAverageScore::class)->execute(
            $reviewableId,
            $reviewableType,
        );

        return $this->success(['review' => $review]);
    }

    public function destroy(string $ids)
    {
        $reviewIds = explode(',', $ids);

        $reviews = Review::whereIn('id', $reviewIds)->get();

        $this->authorize('destroy', [Review::class, $reviews]);

        $reviews->each(function (Review $review) {
            app(UpdateReviewableAverageScore::class)->execute(
                $review->reviewable_id,
                $review->reviewable_type,
            );
        });

        Review::whereIn('id', $reviews->pluck('id'))->delete();

        return $this->success();
    }
}
