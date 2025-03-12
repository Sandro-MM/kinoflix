<?php

namespace App\Actions\Demo;

use App\Models\Video;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Output\ConsoleOutput;

class GenerateDemoVideoVotes
{
    public function execute(): void
    {
        // delete old votes
        DB::table('video_votes')->truncate();

        $count = Video::where('upvotes', '<', 60)->count();

        if ($count == 0) {
            return;
        }

        $output = new ConsoleOutput();
        $output->write('Generating video votes... ', true);
        $progressBar = new ProgressBar($output, $count);
        $progressBar->start();

        Video::select('id')
            ->where('upvotes', '<', 60)
            ->lazyById(100)
            ->each(function (Video $video) use ($progressBar) {
                $video->update([
                    'upvotes' => rand(60, 2100),
                    'downvotes' => rand(50, 150),
                ]);
                $progressBar->advance();
            });

        $progressBar->finish();
    }
}
