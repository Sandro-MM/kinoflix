<?php

use Common\Database\Traits\AddsIndexToExistingTable;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddIndexes extends Migration
{
    use AddsIndexToExistingTable;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('actors_titles', function (Blueprint $table) {
            $this->addIndexIfDoesNotExist($table, 'actor_id');
            $this->addIndexIfDoesNotExist($table, 'title_id');
        });

        Schema::table('episodes', function ($table) {
            $this->addIndexIfDoesNotExist($table, 'season_id');
            $this->addIndexIfDoesNotExist($table, 'episode_number');
            $this->addIndexIfDoesNotExist($table, 'season_number');
        });

        Schema::table('seasons', function ($table) {
            $this->addIndexIfDoesNotExist($table, 'title_id');
            $this->addIndexIfDoesNotExist($table, 'title_tmdb_id');
        });

        Schema::table('reviews', function ($table) {
            $this->addIndexIfDoesNotExist($table, 'title_id');
        });

        Schema::table('images', function ($table) {
            $this->addIndexIfDoesNotExist($table, 'title_id');
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
