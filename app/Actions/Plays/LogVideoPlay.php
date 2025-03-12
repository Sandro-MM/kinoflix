<?php

namespace App\Actions\Plays;

use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Agent\Facades\Agent;

class LogVideoPlay
{
    public function execute(Video $video, array $params = []): void
    {
        if (isset($params['currentTime'])) {
            $this->updateTimeWatched($video, $params);
        } else {
            $this->logVideoPlay($video);
        }
    }

    private function updateTimeWatched(Video $video, array $params): void
    {
        $lastPlay = $video
            ->plays()
            ->forCurrentUser()
            ->orderBy('created_at', 'desc')
            ->first();

        $timeWatched = round($params['currentTime']);
        $duration = round($params['duration']);

        // if user watched over 95%, we can assume video is fully watched
        $fullyWatched = $timeWatched >= (95 / 100) * $duration;

        // if fully watched or watched less than 60 seconds, set time watched to 0
        if ($fullyWatched || $timeWatched < 60) {
            $timeWatched = 0;
        }

        if ($lastPlay) {
            $lastPlay
                ->fill([
                    'time_watched' => $timeWatched,
                    'duration' => round($params['duration']),
                ])
                ->save();
        }
    }

    private function logVideoPlay(Video $video): void
    {
        if (!$this->alreadyLoggedToday($video)) {
            $ip = getIp();
            $video->plays()->create([
                'location' => $this->getLocation($ip),
                'platform' => strtolower(Agent::platform()),
                'device' => $this->getDevice(),
                'browser' => strtolower(Agent::browser()),
                'user_id' => Auth::id(),
                'ip' => $ip,
            ]);
        }
    }

    protected function alreadyLoggedToday(Video $video): bool
    {
        return $video
            ->plays()
            ->forCurrentUser()
            ->whereBetween('created_at', [
                Carbon::now()->subDay(),
                Carbon::now(),
            ])
            ->exists();
    }

    protected function getDevice(): string
    {
        if (Agent::isMobile()) {
            return 'mobile';
        } elseif (Agent::isTablet()) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    protected function getLocation(string $ip): string
    {
        return strtolower(geoip($ip)['iso_code']);
    }
}
