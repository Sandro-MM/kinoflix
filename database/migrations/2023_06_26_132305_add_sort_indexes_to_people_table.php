<?php

use Common\Database\Traits\AddsIndexToExistingTable;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    use AddsIndexToExistingTable;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('people', function (Blueprint $table) {
            $this->addIndexIfDoesNotExist($table, 'birth_date');
            $this->addIndexIfDoesNotExist($table, 'death_date');
            $this->addIndexIfDoesNotExist($table, 'views');
            $this->addIndexIfDoesNotExist($table, 'known_for');
            $this->addIndexIfDoesNotExist($table, 'gender');
            $this->addIndexIfDoesNotExist($table, 'adult');
            $this->addIndexIfDoesNotExist($table, 'popularity');
            $this->addIndexIfDoesNotExist($table, 'created_at');
            $this->addIndexIfDoesNotExist($table, 'name');
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
