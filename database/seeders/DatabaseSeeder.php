<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Services\ChannelPresets;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(WatchlistSeeder::class);
        $this->call(BillingPlanSeeder::class);

        if (
            !config('common.site.demo') &&
            Channel::where('type', 'channel')->count() === 0
        ) {
            $homepageChannel = (new ChannelPresets())->apply('database');
            settings()->save([
                'homepage.type' => 'channels',
                'homepage.value' => $homepageChannel->id,
            ]);
        }
    }
}
