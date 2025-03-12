<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Movie extends Title
{
    protected $table = 'titles';

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('titleType', function (Builder $builder) {
            $builder->where('is_series', false);
        });
    }
}
