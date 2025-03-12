<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('news_article_models', function (Blueprint $table) {
            $table->id();
            $table->morphs('model');
            $table->bigInteger('article_id')->unsigned()->index();
        });
    }

    public function down()
    {
        Schema::dropIfExists('news_article_models');
    }
};
