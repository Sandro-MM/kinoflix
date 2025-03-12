<?php

use Common\Database\Traits\AddsIndexToExistingTable;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use AddsIndexToExistingTable;

    public function up()
    {
        Schema::table('titles', function (Blueprint $table) {
            $this->addIndexIfDoesNotExist($table, 'created_at');
            $this->addIndexIfDoesNotExist($table, 'updated_at');
            $this->addIndexIfDoesNotExist($table, 'budget');
            $this->addIndexIfDoesNotExist($table, 'revenue');
            $this->addIndexIfDoesNotExist($table, 'language');
            $this->addIndexIfDoesNotExist($table, 'adult');
            $this->addIndexIfDoesNotExist($table, 'year');

        });
    }

    public function down()
    {
        //
    }
};
