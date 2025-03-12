<?php

namespace App\Console\Commands;

use App\Models\Season;
use Illuminate\Console\Command;

class UpdateSeasonsFromRemote extends Command
{
    protected $signature = 'seasons:update';

    public function handle(): void
    {
        $seasons = Season::orderBy('updated_at', 'asc')
            ->with('title')
            ->limit(50)
            ->get();

        $this->withProgressBar($seasons, function (Season $season) {
            if ($season->title) {
                $season->maybeUpdateFromExternal($season->title);
            }
        });

        $this->info('Seasons updated');
    }
}
