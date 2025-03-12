<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('video_captions', function (Blueprint $table) {
            if (Schema::hasColumn('video_captions', 'hash')) {
                $table->dropColumn('hash');
            }
        });

        Schema::table('titles', function (Blueprint $table) {
            if (Schema::hasColumn('titles', 'year')) {
                $table->dropColumn('year');
            }
            if (Schema::hasColumn('titles', 'episode_count')) {
                $table->dropColumn('episode_count');
            }
            if (Schema::hasColumn('titles', 'season_count')) {
                $table->dropColumn('season_count');
            }
        });

        Schema::table('episodes', function (Blueprint $table) {
            if (Schema::hasColumn('episodes', 'year')) {
                $table->dropColumn('year');
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
};
