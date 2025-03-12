<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('keyword_title', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('keyword_id')->index();
            $table->bigInteger('title_id')->index();

            $table->unique(['keyword_id', 'title_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('keyword_title');
    }
};
