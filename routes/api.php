<?php

use App\Http\Controllers\AdminTitleTagsController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ImportMediaController;
use App\Http\Controllers\InsightsReportController;
use App\Http\Controllers\ListsController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\PersonCreditsController;
use App\Http\Controllers\RelatedTitlesController;
use App\Http\Controllers\ReviewableController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReviewFeedbackController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\SeasonEpisodesController;
use App\Http\Controllers\TitleAutocompleteController;
use App\Http\Controllers\TitleController;
use App\Http\Controllers\TitleCreditsController;
use App\Http\Controllers\TitleNewsController;
use App\Http\Controllers\TitleSeasonsController;
use App\Http\Controllers\TitleTagsController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\UserRatingsController;
use App\Http\Controllers\UserWatchlistController;
use App\Http\Controllers\VideoApproveController;
use App\Http\Controllers\VideosController;
use App\Http\Controllers\WatchController;
use Common\Channels\ChannelContentOrderController;
use Common\Channels\ChannelController;
use Common\Channels\ChannelItemController;

Route::group(['prefix' => 'v1'], function() {
    Route::group(['middleware' => ['optionalAuth:sanctum', 'verified', 'verifyApiAccess']], function () {
        // episodes
        Route::get('titles/{titleId}/seasons/{seasonNumber}/episodes/{episodeNumber}', [EpisodeController::class, 'show']);
        Route::post('titles/{title}/seasons/{seasonNumber}/episodes', [EpisodeController::class, 'store']);
        Route::put('titles/{title}/seasons/{seasonNumber}/episodes/{episodeNumber}', [EpisodeController::class, 'update']);
        Route::delete('episodes/{id}', [EpisodeController::class, 'destroy']);

        // seasons
        Route::get('titles/{titleId}/seasons/{seasonNumber}', [SeasonController::class, 'show']);
        Route::get('titles/{titleId}/seasons/{seasonNumber}/episode-numbers', [SeasonController::class, 'episodeNumbers']);
        Route::post('titles/{titleId}/seasons', [SeasonController::class, 'store']);
        Route::delete('seasons/{seasonId}', [SeasonController::class, 'destroy']);

        // TITLES
        Route::get('titles/autocomplete', TitleAutocompleteController::class);
        Route::get('titles/{id}', [TitleController::class, 'show']);
        Route::get('movies/{id}', [TitleController::class, 'show']);
        Route::get('series/{id}', [TitleController::class, 'show']);
        Route::get('titles/{id}/related', [RelatedTitlesController::class, 'index']);
        Route::get('titles/{title}/seasons', TitleSeasonsController::class);
        Route::get('titles/{title}/seasons/{seasonNumber}/episodes', SeasonEpisodesController::class);
        Route::get('titles', [TitleController::class, 'index']);
        Route::post('titles', [TitleController::class, 'store']);
        Route::get('titles/{title}/credits', [TitleCreditsController::class, 'index']);
        Route::post('titles/{title}/credits', [TitleCreditsController::class, 'store']);
        Route::post('titles/credits/reorder', [TitleCreditsController::class, 'changeOrder']);
        Route::put('titles/{title}/credits/{pivotId}', [TitleCreditsController::class, 'update']);
        Route::delete('titles/{title}/credits/{id}', [TitleCreditsController::class, 'destroy']);
        Route::put('titles/{id}', [TitleController::class, 'update']);
        Route::get('titles/{title}/news', TitleNewsController::class);
        Route::delete('titles/{ids}', [TitleController::class, 'destroy']);

        // TITLE TAGS
        Route::post('titles/{title}/tags/{type}', [TitleTagsController::class, 'store']);
        Route::delete('titles/{title}/tags/{type}/{tagId}', [TitleTagsController::class, 'destroy']);
        Route::get('title-tags/{type}', [AdminTitleTagsController::class, 'index']);
        Route::post('title-tags/{type}', [AdminTitleTagsController::class, 'store']);
        Route::put('title-tags/{type}/{tagId}', [AdminTitleTagsController::class, 'update']);
        Route::delete('title-tags/{type}/{ids}', [AdminTitleTagsController::class, 'destroy']);

        // IMAGES
        Route::post('images', [ImagesController::class, 'store']);
        Route::delete('images/{id}', [ImagesController::class, 'destroy']);
        Route::post('titles/{id}/images/change-order', 'ImageOrderController@changeOrder');

        // VIDEOS
        Route::get('videos/{video}', [VideosController::class, 'show']);
        Route::get('videos', [VideosController::class, 'index']);
        Route::post('videos', [VideosController::class, 'store']);
        Route::put('videos/{id}', [VideosController::class, 'update']);
        Route::delete('videos/{ids}', [VideosController::class, 'destroy']);
        Route::post('videos/{video}/approve', [VideoApproveController::class, 'approve']);
        Route::post('videos/{video}/disapprove', [VideoApproveController::class, 'disapprove']);
        Route::post('videos/{video}/log-play', [VideosController::class, 'logPlay']);
        Route::post('titles/{video}/videos/change-order', [VideosController::class, 'changeOrder']);

        // watch page
        Route::get('watch/{video}', WatchController::class);

        // people
        Route::get('people', [PersonController::class, 'index']);
        Route::get('people/{id}', [PersonController::class, 'show']);
        Route::get('people/{person}/full-credits/{titleId}/{department}', [PersonCreditsController::class, 'fullTitleCredits']);
        Route::post('people', [PersonController::class, 'store']);
        Route::put('people/{id}', [PersonController::class, 'update']);
        Route::delete('people/{ids}', [PersonController::class, 'destroy']);

        // search
        Route::get('search/{query}', [SearchController::class, 'index']);

        // reviews
        Route::get('reviews', 'ReviewController@index');
        Route::post('reviews', [ReviewController::class, 'store']);
        Route::put('reviews/{id}', [ReviewController::class, 'update']);
        Route::delete('reviews/{id}', [ReviewController::class, 'destroy']);
        Route::get('reviewable/reviews', [ReviewableController::class, 'index']);
        Route::post('reviews/{review}/feedback', [ReviewFeedbackController::class, 'store']);

        // NEWS
        Route::apiResource('news', NewsController::class);
        Route::post('news/import-from-remote-provider', [NewsController::class, 'importFromRemoteProvider']);

        // USERS
        Route::get('user-profile/{user}', [UserProfileController::class, 'show']);
        Route::put('user-profile/{user}', [UserProfileController::class, 'update']);
        Route::get('user-profile/{user}/lists', [UserProfileController::class, 'lists']);
        Route::get('user-profile/{user}/ratings', [UserProfileController::class, 'ratings']);
        Route::get('user-profile/{user}/reviews', [UserProfileController::class, 'reviews']);
        Route::get('user-profile/{user}/comments', [UserProfileController::class, 'comments']);
        Route::get('users/me/ratings', UserRatingsController::class);
        Route::get('users/me/watchlist', UserWatchlistController::class);

        // LISTS
        Route::get('lists', [ListsController::class, 'index']);
        Route::delete('lists/{ids}', [ChannelController::class, 'destroy']);

        // CHANNELS
        Route::post('channel/{channel}/update-content', [ChannelController::class, 'updateContent']);
        Route::get('channel/search-for-addable-content', [ChannelController::class, 'searchForAddableContent']);
        Route::post('channel/apply-preset', [ChannelController::class, 'applyPreset']);
        Route::apiResource('channel', '\Common\Channels\ChannelController')->except(['destroy']);
        Route::delete('channel/{ids}', [ChannelController::class, 'destroy']);
        Route::post('channel/{channel}/add',  [ChannelItemController::class, 'add']);
        Route::post('channel/{channel}/remove', [ChannelItemController::class, 'remove']);
        Route::post('channel/{id}/reorder-content', [ChannelContentOrderController::class, 'changeOrder']);

        // import
        Route::post('media/import', [ImportMediaController::class, 'importMediaItem']);
        Route::post('tmdb/import', [ImportMediaController::class, 'importViaBrowse']);

        // Analytics
        Route::get('reports/insights', InsightsReportController::class);
    });
});
