<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('country_title', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('production_country_id')->index();
            $table->bigInteger('title_id')->index();

            $table->unique(['production_country_id', 'title_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('countryables');
    }
};
