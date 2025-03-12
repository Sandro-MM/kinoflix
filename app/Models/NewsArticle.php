<?php

namespace App\Models;

use Common\Pages\CustomPage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class NewsArticle extends CustomPage
{
    const MODEL_TYPE = 'newsArticle';

    protected $guarded = ['id'];

    protected $appends = ['model_type'];

    protected function slug(): Attribute
    {
        return Attribute::make(set: fn(string $value) => slugify($value));
    }

    public function scopeCompact(Builder $query)
    {
        return $query->select([
            'id',
            'image',
            'title',
            'slug',
            'byline',
            'source',
            'created_at',
        ]);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'slug' => $this->slug,
            'source' => $this->source,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->title,
            'image' => $this->image,
            'description' => Str::limit($this->body, 100),
            'model_type' => static::MODEL_TYPE,
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at'];
    }

    public static function getModelTypeAttribute(): string
    {
        return static::MODEL_TYPE;
    }
}
