<?php

namespace App\Models;

use Common\Core\BaseModel;
use Common\Votes\OrdersByWeightedScore;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Review extends BaseModel
{
    use OrdersByWeightedScore;

    public const MODEL_TYPE = 'review';
    protected $guarded = ['id'];
    protected $appends = ['model_type'];

    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'reviewable_id' => 'integer',
        'score' => 'integer',
        'has_text' => 'boolean',
        'helpful_count' => 'integer',
        'not_helpful_count' => 'integer',
    ];

    public function feedback(): HasMany
    {
        return $this->hasMany(ReviewFeedback::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->select(
            'id',
            'first_name',
            'last_name',
            'email',
            'image',
        );
    }

    public function reviewable(): MorphTo
    {
        return $this->morphTo();
    }

    public function reports(): HasMany
    {
        return $this->hasMany(ReviewReport::class);
    }

    public function scopeOrderByMostHelpful(Builder $query): Builder
    {
        return $query->orderByWeightedScore(
            'desc',
            'helpful_count',
            'not_helpful_count',
        );
    }

    public function scopeWithTextOnly(Builder $query): Builder
    {
        return $query->where('has_text', true);
    }

    public function scopeForReviewable(Builder $builder, $reviewable): Builder
    {
        return $builder->when(
            config('common.site.demo'),
            // load review for this reviewable as well as demo reviews
            function (Builder $builder) use ($reviewable) {
                $builder->where(function (Builder $builder) use ($reviewable) {
                    $builder
                        ->where(function (Builder $builder) use ($reviewable) {
                            $type = $reviewable->is_series ? 'series' : 'movie';
                            $builder
                                ->where('reviewable_id', 0)
                                ->where('reviewable_type', "demo-$type");
                        })
                        ->orWhere(function (Builder $builder) use (
                            $reviewable,
                        ) {
                            $builder
                                ->where('reviewable_id', $reviewable->id)
                                ->where(
                                    'reviewable_type',
                                    $reviewable->getMorphClass(),
                                );
                        });
                });
            },
            // load reviews for this reviewable only
            function (Builder $builder) use ($reviewable) {
                $builder
                    ->where('reviewable_id', $reviewable->id)
                    ->where('reviewable_type', $reviewable->getMorphClass());
            },
        );
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
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
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
