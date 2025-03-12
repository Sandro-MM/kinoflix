<?php

namespace App\Models;

use Common\Tags\Tag;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

class ProductionCountry extends Tag
{
    const MODEL_TYPE = 'production_country';

    public function titles(): BelongsToMany
    {
        return $this->belongsToMany(Title::class, 'country_title');
    }

    public function insertOrRetrieve(
        Collection|array $tags,
        ?string $type = 'custom',
        ?int $userId = null,
    ): Collection {
        // countries table will not have type or user_id columns
        return parent::insertOrRetrieve($tags, null, null);
    }

    public function getByNames(
        Collection $names,
        string $type = null,
        int $userId = null,
    ): Collection {
        return parent::getByNames($names, null, null);
    }
}
