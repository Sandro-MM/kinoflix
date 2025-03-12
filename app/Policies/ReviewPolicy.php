<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Collection;

class ReviewPolicy
{
    use HandlesAuthorization;

    public function index(User $user)
    {
        return $user->hasPermission('reviews.view');
    }

    public function show(User $user)
    {
        return $user->hasPermission('reviews.view');
    }

    public function store(User $user)
    {
        return $user->hasPermission('reviews.create');
    }

    public function update(User $user)
    {
        return $user->hasPermission('reviews.update');
    }

    public function destroy(User $user, Collection $reviews)
    {
        if ($user->hasPermission('reviews.delete')) return true;

        return $reviews->every(fn(Review $review) => $user->id && $user->id === $review->user_id);
    }
}
