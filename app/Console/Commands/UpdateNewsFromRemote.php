<?php

namespace App\Console\Commands;

use App\Actions\News\ImportNewsFromRemoteProvider;
use Illuminate\Console\Command;

class UpdateNewsFromRemote extends Command
{
    protected $signature = 'news:update';

    protected $description = 'Update news from currently selected 3rd party site.';

    public function handle(): void
    {
        app(ImportNewsFromRemoteProvider::class)->execute();

        $this->info('News updated.');
    }
}
