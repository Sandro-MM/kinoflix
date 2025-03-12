<?php

namespace App\Actions\Titles;

use App\Models\Image;
use App\Models\Listable;
use App\Models\Review;
use App\Models\Season;
use App\Models\Title;
use App\Models\Video;
use Common\Comments\Comment;
use Illuminate\Support\Facades\DB;

class DeleteTitles
{
    public function execute(array $titleIds): void
    {
        $seasonIds = app(Season::class)
            ->whereIn('title_id', $titleIds)
            ->pluck('id');
        app(DeleteSeasons::class)->execute($seasonIds);

        // credits
        DB::table('creditables')
            ->whereIn('creditable_id', $titleIds)
            ->where('creditable_type', Title::MODEL_TYPE)
            ->delete();

        // images
        app(Image::class)
            ->whereIn('model_id', $titleIds)
            ->where('model_type', Title::MODEL_TYPE)
            ->delete();

        // list items
        app(Listable::class)
            ->whereIn('listable_id', $titleIds)
            ->where('listable_type', Title::MODEL_TYPE)
            ->delete();

        // channel items
        DB::table('channelables')
            ->whereIn('channelable_id', $titleIds)
            ->where('channelable_type', Title::MODEL_TYPE)
            ->delete();

        // reviews
        Review::whereIn('reviewable_id', $titleIds)
            ->where('reviewable_type', Title::MODEL_TYPE)
            ->delete();

        // comments
        Comment::whereIn('commentable_id', $titleIds)
            ->where('commentable_type', Title::MODEL_TYPE)
            ->delete();

        // tags
        DB::table('taggables')
            ->whereIn('taggable_id', $titleIds)
            ->where('taggable_type', Title::MODEL_TYPE)
            ->delete();

        // keywords
        DB::table('keyword_title')
            ->whereIn('title_id', $titleIds)
            ->delete();

        // countries
        DB::table('country_title')
            ->whereIn('title_id', $titleIds)
            ->delete();

        // genres
        DB::table('genre_title')
            ->whereIn('title_id', $titleIds)
            ->delete();

        // videos
        $videoIds = app(Video::class)
            ->whereIn('title_id', $titleIds)
            ->pluck('id');
        app(Video::class)
            ->whereIn('id', $videoIds)
            ->delete();

        DB::table('video_votes')
            ->whereIn('video_id', $videoIds)
            ->delete();
        DB::table('video_captions')
            ->whereIn('video_id', $videoIds)
            ->delete();
        DB::table('video_reports')
            ->whereIn('video_id', $videoIds)
            ->delete();
        DB::table('video_plays')
            ->whereIn('video_id', $videoIds)
            ->delete();

        // titles
        Title::withoutGlobalScope('adult')
            ->whereIn('id', $titleIds)
            ->delete();
    }
}
