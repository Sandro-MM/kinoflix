<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listable extends Model
{
    protected $casts = [
        'id' => 'integer',
        'order' => 'integer',
        'list_id' => 'integer',
        'listable_id' => 'integer',
    ];

    public const UPDATED_AT = null;
}
