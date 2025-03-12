<?php

namespace App\Models;

use Common\Tags\Tag;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;
use Laravel\Scout\Searchable;

class Keyword extends Tag
{
    use Searchable;

    const MODEL_TYPE = 'keyword';

    public function titles(): BelongsToMany
    {
        return $this->belongsToMany(Title::class);
    }

    public function insertOrRetrieve(
        Collection|array $tags,
        ?string $type = 'custom',
        ?int $userId = null,
    ): Collection {
        // keywords table will not have type or user_id columns
        return parent::insertOrRetrieve($tags, null, null);
    }

    public function getByNames(
        Collection $names,
        string $type = null,
        int $userId = null,
    ): Collection {
        return parent::getByNames($names, null, null);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'display_name' => $this->display_name,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }
}
