<?php

namespace App\Console\Commands;

use DB;
use Illuminate\Console\Command;

class TruncateTitleData extends Command
{
    protected $signature = 'titles:truncate';

    protected $description = 'Truncate all title related database tables.';

    public function handle()
    {
        DB::table('channelables')->truncate();
        DB::table('channels')->truncate();
        DB::table('comment_reports')->truncate();
        DB::table('comment_votes')->truncate();
        DB::table('comments')->truncate();
        DB::table('country_title')->truncate();
        DB::table('creditables')->truncate();
        DB::table('episodes')->truncate();
        DB::table('genre_title')->truncate();
        DB::table('genres')->truncate();
        DB::table('images')->truncate();
        DB::table('keyword_title')->truncate();
        DB::table('keywords')->truncate();
        DB::table('production_countries')->truncate();
        DB::table('review_feedback')->truncate();
        DB::table('review_reports')->truncate();
        DB::table('reviews')->truncate();
        DB::table('seasons')->truncate();
        DB::table('tags')->truncate();
        DB::table('taggables')->truncate();
        DB::table('people')->truncate();
        DB::table('titles')->truncate();
        DB::table('videos')->truncate();
        DB::table('video_captions')->truncate();
        DB::table('video_reports')->truncate();
        DB::table('video_plays')->truncate();
        DB::table('video_votes')->truncate();
        DB::table('news_article_models')->truncate();
    }
}
