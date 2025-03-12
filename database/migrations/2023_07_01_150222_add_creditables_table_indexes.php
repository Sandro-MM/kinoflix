<?php

use Common\Database\Traits\AddsIndexToExistingTable;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use AddsIndexToExistingTable;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('creditables', function (Blueprint $table) {
            $this->addIndexIfDoesNotExist($table, 'creditable_type');
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
