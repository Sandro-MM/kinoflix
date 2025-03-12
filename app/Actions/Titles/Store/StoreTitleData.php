<?php

namespace App\Actions\Titles\Store;

use App\Actions\Titles\StoresMediaImages;
use App\Models\Season;
use App\Models\Title;
use App\Models\Video;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class StoreTitleData
{
    use StoresMediaImages;

    private ?Title $title = null;

    private ?array $data = null;

    private ?array $options = null;

    public function execute(
        Title $title,
        array $data,
        array $options = [],
    ): Title {
        $this->title = $title;
        $this->data = $data;
        $this->options = $options;

        $this->persistData();
        $this->persistRelations();

        return $this->title;
    }

    private function persistData(): void
    {
        $titleData = array_filter(
            $this->data,
            fn(
                $value, // make sure we don't overwrite existing values with null
            ) => !is_array($value) &&
                ($this->options['overrideWithEmptyValues'] ?? !is_null($value)),
        );

        $this->title->fill($titleData)->save();
    }

    private function persistRelations(): void
    {
        $relations = array_filter($this->data, fn($value) => is_array($value));

        foreach ($relations as $name => $values) {
            switch ($name) {
                case 'videos':
                    $this->persistVideos($values);
                    break;
                case 'images':
                    $this->storeImages($values, $this->title);
                    break;
                case 'genres':
                    $this->persistTags($values, 'genre');
                    break;
                case 'countries':
                    $this->persistTags($values, 'production_country');
                    break;
                case 'cast':
                    app(StoreCredits::class)->execute($this->title, $values);
                    break;
                case 'keywords':
                    $this->persistTags($values, 'keyword');
                    break;
                case 'seasons':
                    $this->persistSeasons($values);
            }
        }
    }

    private function persistSeasons(array $seasons): void
    {
        $newSeasons = collect($seasons)
            ->map(function ($season) {
                $season['title_id'] = $this->title->id;
                return $season;
            })
            ->filter(
                fn($season) => !$this->title->seasons->contains(
                    'number',
                    $season['number'],
                ),
            );

        if ($newSeasons->isNotEmpty()) {
            Season::insert($newSeasons->toArray());
        }
    }

    private function persistTags(array $tags, string $type): void
    {
        $values = collect($tags)->map(
            fn($tag) => [
                'name' => $tag['name'],
                'display_name' => Arr::get(
                    $tag,
                    'display_name',
                    ucfirst($tag['name']),
                ),
            ],
        );

        $tags = app(modelTypeToNamespace($type))->insertOrRetrieve(
            $values,
            $type,
        );

        $relation = $this->title->{Str::camel(Str::plural($type))}();
        $relation->syncWithoutDetaching($tags->pluck('id'));
    }

    private function persistVideos(array $values): void
    {
        $videos = collect($values)
            ->unique(fn($v) => strtolower($v['name']))
            ->values()
            ->map(function ($value, $i) {
                $value['title_id'] = $this->title->id;
                $value['order'] = $i + 1;
                $value['created_at'] = now();
                $value['updated_at'] = now();
                return $value;
            });

        Video::where('origin', '!=', 'local')
            ->where('title_id', $this->title->id)
            ->whereNull('episode_num')
            ->delete();

        Video::insert($videos->toArray());
    }
}
