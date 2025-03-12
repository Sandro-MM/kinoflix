<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('video_votes')
            ->where('vote_type', 'positive')
            ->update(['vote_type' => 'upvote']);

        DB::table('video_votes')
            ->where('vote_type', 'negative')
            ->update(['vote_type' => 'downvote']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
