<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::rename('video_ratings', 'video_votes');
    }

    public function down()
    {
        //
    }
};
