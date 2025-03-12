<?php

namespace App\Policies;

use App\Models\Channel;
use App\Models\User;
use Common\Core\Policies\BasePolicy;
use Illuminate\Support\Collection;

class ChannelPolicy extends BasePolicy
{
    public function index(?User $user, string $channelType = 'channel')
    {
        if ($channelType === 'list') {
            return $this->authorizePermission($user, 'lists.view');
        }

        return $this->authorizePermission($user, 'channels.update');
    }

    public function show(?User $user, Channel $channel)
    {
        if ($channel->user_id && $channel->user_id === $user->id) {
            return true;
        }

        if ($channel->type === 'channel') {
            return $this->authorizePermission($user, 'titles.view');
        } else {
            // if list not public and user is not owner, deny access
            if (!$channel->public && !$channel->user_id === $user?->id) {
                return false;
            }
            // require "lists.view" permission always, so users can be
            // blocked completely from lists functionality if not subscribed
            return $this->authorizePermission($user, 'lists.view');
        }
    }

    public function store(User $user, string $channelType = null)
    {
        if ($channelType === 'list') {
            return $this->hasPermission($user, 'lists.create');
        }
        return $this->hasPermission($user, 'channels.create');
    }

    public function update(User $user, Channel $channel)
    {
        if ($channel->user_id && $channel->user_id === $user->id) {
            return true;
        }

        if ($channel->type === 'list') {
            return $this->hasPermission($user, 'lists.update');
        }

        return $this->hasPermission($user, 'channels.update');
    }

    public function destroy(User $user, Collection $channels = null)
    {
        $type = $channels?->first()['type'] ?? 'channel';

        if ($type === 'list' && $this->hasPermission($user, 'lists.delete')) {
            return true;
        }

        if (
            $type === 'channel' &&
            $this->hasPermission($user, 'channels.delete')
        ) {
            return true;
        }

        return collect($channels)->every(
            fn(Channel $list) => $list->user_id === $user->id,
        );
    }
}
