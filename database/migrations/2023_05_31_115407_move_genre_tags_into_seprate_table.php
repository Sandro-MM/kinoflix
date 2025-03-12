<?php

use Common\Tags\Tag;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        ini_set('memory_limit', '-1');
        set_time_limit(0);

        $this->handle('genre', 'genre_title', 'genre_id');
        $this->handle('keyword', 'keyword_title', 'keyword_id');
        $this->handle(
            'production_country',
            'country_title',
            'production_country_id',
        );

        DB::table('taggables')->truncate();
    }

    public function down()
    {
        //
    }

    protected function handle(string $tagType, string $table, string $column)
    {
        Tag::where('type', $tagType)->chunkById(100, function ($_oldTags) use (
            $tagType,
            $table,
            $column,
        ) {
            $newModel = app(modelTypeToNamespace($tagType));

            $oldTags = [];
            $newTags = [];

            $_oldTags
                ->filter(fn($tag) => !!$tag->name)
                ->each(function ($tag) use ($newModel, &$oldTags, &$newTags) {
                    $newTag = $newModel
                        ->firstOrCreate(
                            ['name' => $tag->name],
                            [
                                'name' => $tag->name,
                                'display_name' => $tag->display_name,
                            ],
                        );
                    $oldTags[$tag->id] = $tag->toArray();
                    $newTags[$newTag->name] = $newTag->toArray();
                });

            DB::table('taggables')
                ->whereIn('tag_id', array_keys($oldTags))
                ->chunkById(100, function ($taggables) use (
                    $newTags,
                    $oldTags,
                    $table,
                    $column,
                ) {
                    $oldTaggableIds = [];
                    $newRecords = $taggables
                        ->map(function ($taggable) use (
                            $oldTags,
                            $newTags,
                            $column,
                            &$oldTaggableIds,
                        ) {
                            $tagName = $oldTags[$taggable->tag_id]['name'];
                            if (!isset($newTags[$tagName])) {
                                dd('x', $tagName, array_keys($newTags));
                            }
                            $newTagId = $newTags[$tagName]['id'];
                            $oldTaggableIds[] = $taggable->id;
                            return [
                                $column => $newTagId,
                                'title_id' => $taggable->taggable_id,
                            ];
                        })
                        ->toArray();

                    DB::table($table)->upsert(
                        $newRecords,
                        $newRecords,
                        array_keys($newRecords[0]),
                    );

                    // delete from old taggables table
                    DB::table('taggables')
                        ->whereIn('id', $oldTaggableIds)
                        ->delete();
                });

            DB::table('tags')
                ->whereIn('id', $_oldTags->pluck('id'))
                ->delete();
        });
    }
};
