<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('settings')
            ->where('name', 'content.people_provider')
            ->where('value', 'local')
            ->delete();

        DB::table('settings')
            ->where('name', 'content.title_provider')
            ->where('value', 'local')
            ->delete();
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
