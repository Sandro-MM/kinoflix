<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoReport extends Model
{
    protected $guarded = ['id'];
    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'comment_id' => 'integer',
    ];
}
