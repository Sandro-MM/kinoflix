<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Database\Seeder;

class WatchlistSeeder extends Seeder
{
    /**
     * Create watchlist for users that don't already have one.
     */
    public function run(): void
    {
        $userIds = app(User::class)
            ->whereDoesntHave('watchlist')
            ->pluck('id');

        $userIds->each(function($userId) {
            Channel::create([
                'name' => 'watchlist',
                'user_id' => $userId,
                'internal' => true,
                'public' => false,
                'type' => 'list',
                'config' => [
                    'contentType' => 'manual',
                    'contentOrder' => 'channelables.order:asc',
                    'contentModel' => 'title',
                    'layout' => 'grid',
                    'preventDeletion' => true,
                ]
            ]);
        });
    }
}
