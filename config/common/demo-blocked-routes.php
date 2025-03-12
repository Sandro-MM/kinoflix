<?php

return [
    // sitemap
    ['method' => 'POST', 'name' => 'admin/sitemap/generate'],

    // titles
    ['method' => 'POST', 'name' => 'titles'],
    ['method' => 'POST', 'name' => 'titles/{title}/credits'],
    ['method' => 'POST', 'name' => 'titles/credits/reorder'],
    ['method' => 'PUT', 'name' => 'titles/credits/{id}'],
    ['method' => 'DELETE', 'name' => 'titles/credits/{id}'],
    ['method' => 'DELETE', 'name' => 'titles/{title}/credits/{id}'],
    ['method' => 'PUT', 'name' => 'titles/{title}/credits/{pivotId}'],
    ['method' => 'PUT', 'name' => 'titles/{id}'],
    ['method' => 'DELETE', 'name' => 'titles/{ids}'],
    ['method' => 'DELETE', 'name' => 'images/{id}'],
    ['method' => 'DELETE', 'name' => 'videos/{id}'],

    // titles tags
    ['method' => 'POST', 'name' => 'titles/{title}/tags/{type}'],
    ['method' => 'POST', 'name' => 'title-tags/{type}'],
    ['method' => 'PUT', 'name' => 'title-tags/{type}/{tagId}'],
    ['method' => 'DELETE', 'name' => 'title-tags/{type}/{ids}'],
    ['method' => 'DELETE', 'name' => 'titles/{title}/tags/{type}/{tagId}'],

    // seasons
    ['method' => 'POST', 'name' => ' titles/{titleId}/seasons'],
    ['method' => 'DELETE', 'name' => 'seasons/{seasonId}'],

    // episodes
    ['method' => 'POST', 'name' => 'seasons/{seasonId}/episodes'],
    [
        'method' => 'PUT',
        'name' =>
            'titles/{title}/seasons/{seasonNumber}/episodes/{episodeNumber}',
    ],
    ['method' => 'DELETE', 'name' => 'episodes/{id}'],

    // people
    ['method' => 'POST', 'name' => 'people'],
    ['method' => 'PUT', 'name' => 'people/{id}'],
    ['method' => 'DELETE', 'name' => 'people/{ids}'],

    // images
    ['method' => 'DELETE', 'name' => 'images'],
    ['method' => 'POST', 'name' => 'images'],

    // reviews
    ['method' => 'DELETE', 'name' => 'reviews/{id}', 'origin' => 'admin'],
    ['method' => 'PUT', 'name' => 'reviews/{id}', 'origin' => 'admin'],

    // news
    ['method' => 'POST', 'name' => 'news'],
    ['method' => 'PUT', 'name' => 'news/{id}'],
    ['method' => 'DELETE', 'name' => 'news/{news}'],

    // videos
    ['method' => 'POST', 'name' => 'videos'],
    ['method' => 'PUT', 'name' => 'videos/{id}'],
    ['method' => 'DELETE', 'name' => 'videos/{ids}'],
    ['method' => 'POST', 'name' => 'titles/{video}/videos/change-order'],
    ['method' => 'POST', 'name' => 'videos/{video}/approve'],
    ['method' => 'POST', 'name' => 'videos/{video}/disapprove'],

    // images
    ['method' => 'POST', 'name' => 'uploads/images', 'origin' => 'admin'],

    // custom pages
    [
        'method' => 'POST',
        'name' => 'custom-pages',
    ],

    // import
    ['method' => 'POST', 'name' => 'media/import'],
    ['method' => 'GET', 'name' => 'tmdb/import'],
    ['method' => 'POST', 'name' => 'news/import-from-remote-provider'],
];
