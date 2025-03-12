<?php

namespace App\Console\Commands;

use App\Services\SitemapGenerator;
use Illuminate\Console\Command;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate sitemaps for all site resources.';

    public function handle(): void
    {
        app(SitemapGenerator::class)->generate();
    }
}
