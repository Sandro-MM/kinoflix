<?php

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateWatchlistForExistingUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        User::with('watchlist')
            ->chunkById(50, function (Collection $users) {
                $records = $users->filter(function(User $user) {
                    return !$user->watchlist;
                })->map(function(User $user) {
                    return [
                        'name' => 'watchlist',
                        'user_id' => $user->id,
                        'system' => 1,
                        'public' => 0,
                    ];
                });

                if ($records->isNotEmpty()) {
                    DB::table('lists')->insert($records->toArray());
                }
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
