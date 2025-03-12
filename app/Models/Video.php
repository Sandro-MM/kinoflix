<?php

namespace App\Models;

use Common\Comments\Comment;
use Common\Core\BaseModel;
use Common\Votes\OrdersByWeightedScore;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\DB;

class Video extends BaseModel
{
    use OrdersByWeightedScore;

    public const VIDEO_TYPE_EMBED = 'embed';
    public const VIDEO_TYPE_DIRECT = 'direct';
    public const VIDEO_TYPE_EXTERNAL = 'external';
    public const MODEL_TYPE = 'video';

    protected $guarded = ['id'];
    protected $appends = ['score', 'model_type'];
    protected $casts = [
        'negative_votes' => 'integer',
        'positive_votes' => 'integer',
        'order' => 'integer',
        'approved' => 'boolean',
        'title_id' => 'integer',
        'id' => 'integer',
        'user_id' => 'integer',
    ];

    public function title(): BelongsTo
    {
        return $this->belongsTo(Title::class)->select([
            'id',
            'name',
            'poster',
            'backdrop',
            'is_series',
        ]);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(VideoVote::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(VideoReport::class);
    }

    public function captions(): HasMany
    {
        return $this->hasMany(VideoCaption::class)->orderBy('order', 'asc');
    }

    public function plays(): HasMany
    {
        return $this->hasMany(VideoPlay::class);
    }

    public function latestPlay(): HasOne
    {
        return $this->hasOne(VideoPlay::class)->orderBy('created_at', 'desc');
    }

    public function episode(): BelongsTo
    {
        return $this->belongsTo(Episode::class);
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')
            ->orderBy('created_at', 'desc')
            ->orderByWeightedScore();
    }

    public function scopeOrderByMostUpvotes(Builder $query): Builder
    {
        return $query->orderByWeightedScore('desc');
    }

    public function getScoreAttribute()
    {
        $total = $this->positive_votes + $this->negative_votes;
        if (!$total) {
            return null;
        }
        return round(($this->positive_votes / $total) * 100);
    }

    public function scopeApplySelectedSort(Builder $query): Builder
    {
        [$col, $dir] = explode(
            ':',
            settings('streaming.default_sort', 'order:asc'),
        );

        if ($col === 'score') {
            $query->orderByWeightedScore();
        } elseif ($col === 'order') {
            $query->orderByRaw('`category` = "trailer" desc, `order` asc');
        } else {
            $query
                ->orderBy(DB::raw('`category` = "trailer"'), 'desc')
                ->orderBy($col, $dir);
        }

        return $query;
    }

    public function scopeFromConfiguredCategory(Builder $builder): Builder
    {
        $contentType = settings('streaming.video_panel_content');

        if ($contentType === 'full') {
            $builder->where('category', 'full');
        } elseif ($contentType === 'short') {
            $builder->where('category', '!=', 'full');
        } elseif ($contentType !== 'all') {
            $builder->where('category', $contentType);
        }

        return $builder;
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at'];
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->thumbnail,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
