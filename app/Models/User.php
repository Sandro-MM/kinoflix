<?php

namespace App\Models;

use Common\Auth\BaseUser;
use Common\Comments\Comment;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Laravel\Sanctum\HasApiTokens;

class User extends BaseUser
{
    use HasApiTokens;

    public function watchlist(): HasOne
    {
        return $this->hasOne(Channel::class)
            ->where('type', 'list')
            ->where('name', 'watchlist');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function lists(): HasMany
    {
        return $this->hasMany(Channel::class)->where('type', 'list');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    public function links(): MorphMany
    {
        return $this->morphMany(ProfileLink::class, 'linkeable');
    }
}
