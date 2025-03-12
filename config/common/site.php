<?php

return [
    'local_search_mode' => env('LOCAL_SEARCH_MODE', 'fulltext'),
    'rating_column' => env('RATING_COLUMN', 'tmdb_vote_average'),
    'tmdb_delete_when_sync' => env('TMDB_DELETE_WHEN_SYNC', false),
    'fake_plays_data' => env('FAKE_PLAYS_DATA', false),
];
