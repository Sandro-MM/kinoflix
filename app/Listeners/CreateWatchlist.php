<?php

namespace App\Listeners;

use App\Models\Channel;
use Common\Auth\Events\UserCreated;

class CreateWatchlist
{
    public function handle(UserCreated $event): void
    {
        if ($event->user->watchlist) return;

        Channel::create([
            'name' => 'watchlist',
            'user_id' => $event->user->id,
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
    }
}
