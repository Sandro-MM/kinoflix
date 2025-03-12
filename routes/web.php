<?php

use App\Http\Controllers\AppHomeController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\FallbackRouteController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\TitleController;
use App\Http\Controllers\WatchController;
use Common\Core\Controllers\HomeController;

// FRONT-END ROUTES THAT NEED TO BE PRE-RENDERED
Route::get('/', AppHomeController::class);

// TITLE/SEASON/EPISODE
Route::get('titles/{id}/{name}/{pageName?}', [TitleController::class, 'show'])->where('pageName', 'images|videos|full-credits');
Route::get('titles/{titleId}/{titleName}/season/{seasonNumber}', [SeasonController::class, 'show']);
Route::get('titles/{titleId}/{titleName}/season/{seasonNumber}/episode/{episodeNumber}/{pageName?}', [EpisodeController::class, 'show']);

Route::get('watch/{video}', WatchController::class);
Route::get('people/{id}/{name}', [PersonController::class, 'show']);
Route::get('search/{query}', [SearchController::class, 'index']);
Route::get('news/{id}', [NewsController::class, 'show']);

Route::get('contact', [HomeController::class, 'render']);
Route::get('login', [HomeController::class, 'render'])->name('login');
Route::get('register', [HomeController::class, 'render'])->name('register');
Route::get('forgot-password', [HomeController::class, 'render']);
Route::get('pricing', '\Common\Billing\PricingPageController');

// CHANNELS and fallback to client rendering if no channel matches
Route::fallback(FallbackRouteController::class);
