<?php

namespace App\Services;

use App\Models\Channel;
use Common\Channels\GenerateChannelsFromConfig;

class ChannelPresets
{
    public function getAll(): array
    {
        return [
            [
                'name' => 'Movie database',
                'preset' => 'database',
                'description' =>
                    'Channel preset for a movie database site similar to IMDb',
            ],
            [
                'name' => 'Anime',
                'preset' => 'anime',
                'description' =>
                    'Channel preset for an anime based site similar to Crunchyroll',
            ],
            [
                'name' => 'Streaming',
                'preset' => 'streaming',
                'description' =>
                    'Channel preset for a streaming site similar to Netflix',
            ],
        ];
    }

    public function apply(string $preset): Channel
    {
        $presetConfig = match ($preset) {
            'anime' => resource_path('defaults/channels/anime-channels.json'),
            'streaming' => resource_path(
                'defaults/channels/streaming-channels.json',
            ),
            default => resource_path(
                'defaults/channels/database-channels.json',
            ),
        };

        return (new GenerateChannelsFromConfig())->execute([
            resource_path('defaults/channels/shared-channels.json'),
            $presetConfig,
        ]);
    }
}
