<?php

namespace App\Listeners;

use App\Models\Channel;
use Common\Auth\Events\UsersDeleted;
use Common\Channels\DeleteChannels;

class DeleteUserChannels
{
    public function handle(UsersDeleted $event): void
    {
        $channels = Channel::whereIn(
            'user_id',
            $event->users->pluck('id'),
        )->get();

        app(DeleteChannels::class)->execute($channels, force: true);
    }
}
