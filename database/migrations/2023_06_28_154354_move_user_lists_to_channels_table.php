<?php

use App\Models\Channel;
use App\Models\Person;
use App\Models\Title;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('lists')
            ->whereNull('auto_update')
            ->where('name', '!=', 'watchlist')
            ->lazyById(100)
            ->each(function ($list) {
                $channel =
                    Channel::where('name', $list->name)->first() ??
                    Channel::create([
                        'name' => $list->name,
                        'description' => $list->description,
                        'user_id' => $list->user_id,
                        'type' => 'list',
                        'public' => $list->public,
                        'internal' => $list->system,
                        'created_at' => $list->created_at,
                        'updated_at' => $list->updated_at,
                        'config' => json_encode([
                            'contentType' => 'manual',
                            'contentOrder' => 'channelables.order:asc',
                            'contentModel' => 'title',
                            'layout' => 'grid',
                            'preventDeletion' => $list?->system ?? false,
                        ]),
                    ]);

                $listables = DB::table('listables')
                    ->where('list_id', $list->id)
                    ->where(
                        // skip episodes
                        fn($q) => $q
                            ->where(function ($q) {
                                $q->where(
                                    'listable_type',
                                    Title::class,
                                )->orWhere('listable_type', Title::MODEL_TYPE);
                            })
                            ->orWhere(function ($q) {
                                $q->where(
                                    'listable_type',
                                    Person::class,
                                )->orWhere('listable_type', Person::MODEL_TYPE);
                            }),
                    )
                    ->get();

                $newChannelables = $listables->map(function ($listable) use (
                    $channel,
                ) {
                    $modelType = str_contains($listable->listable_type, '\\')
                        ? Str::of($listable->listable_type)
                            ->lower()
                            ->explode('\\')
                            ->last()
                            ->toString()
                        : $listable->listable_type;
                    return [
                        'channel_id' => $channel->id,
                        'channelable_id' => $listable->listable_id,
                        'channelable_type' => $listable->listable_type,
                        'order' => $listable->order,
                        'created_at' => $listable->created_at,
                    ];
                });

                $currentChannelables = DB::table('channelables')
                    ->where('channel_id', $channel->id)
                    ->get();

                $filteredChannelables = $newChannelables->filter(function (
                    $newChannelable,
                ) use ($currentChannelables) {
                    return !$currentChannelables->contains(
                        'channelable_id',
                        $newChannelable['channelable_id'],
                    );
                });

                DB::table('channelables')->insert(
                    $filteredChannelables->toArray(),
                );
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};
