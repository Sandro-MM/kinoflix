<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class VideoPlay extends Model
{
    public const UPDATED_AT = null;
    protected $guarded = ['id'];
    protected $casts = ['user_id' => 'integer', 'video_id' => 'integer'];

    public function scopeForCurrentUser(Builder $builder): Builder
    {
        if (Auth::check()) {
            return $builder->where('user_id', Auth::id());
        } else {
            return $builder->where('ip', getIp());
        }
    }
}
