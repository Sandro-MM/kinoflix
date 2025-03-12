<?php

use App\Models\Season;
use App\Services\Data\Tmdb\TransformData;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        $prefix = TransformData::TMDB_IMAGE_BASE;
        Season::whereNotNull('poster')
            ->where('poster', 'like', '/%')
            ->update([
                'poster' => DB::raw(
                    "CONCAT('$prefix', poster)",
                ),
            ]);
    }

    public function down()
    {
        //
    }
};
