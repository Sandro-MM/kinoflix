<?php

namespace App\Http\Resources;

use App\Models\Channel;
use App\Models\NewsArticle;
use App\Models\Person;
use App\Models\Title;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ChannelResource extends JsonResource
{
    public function toArray($request)
    {
        $config = Arr::except($this->config, [
            'seoTitle',
            'seoDescription',
            'adminDescription',
            'presetId',
        ]);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'public' => $this->public,
            'description' => $this->description,
            'internal' => $this->internal,
            'config' => $config,
            'model_type' => $this->model_type,
            'restriction' => $this->restriction?->toArray(),
            'type' => $this->type,
            'updated_at' => $this->updated_at,
            'user_id' => $this->user_id,
            'user' =>
                $this->relationLoaded('user') &&
                $request->get('channelType', 'list')
                    ? $this->user?->toArray()
                    : null,
            'content' => $this->content
                ? [
                    'current_page' => $this->content->currentPage(),
                    'from' => $this->content->firstItem(),
                    //'last_page' => $this->content->lastPage(),
                    'next_page' => $this->content->hasMorePages()
                        ? $this->content->currentPage() + 1
                        : null,
                    'per_page' => $this->content->perPage(),
                    'prev_page' =>
                        $this->content->currentPage() > 1
                            ? $this->content->currentPage() - 1
                            : null,
                    'to' => $this->content->lastItem(),
                    'total' =>
                        $this->content instanceof LengthAwarePaginator
                            ? $this->content->total()
                            : null,
                    'data' => $this->content
                        ->getCollection()
                        ->map(function ($item) use ($request) {
                            return match ($item->model_type) {
                                Channel::MODEL_TYPE => (new ChannelResource(
                                    $item,
                                ))->toArray($request),
                                Title::MODEL_TYPE => [
                                    'id' => $item->id,
                                    'name' => $item->name,
                                    'release_date' => $item->release_date,
                                    'poster' => $item->poster,
                                    'backdrop' => $item->backdrop,
                                    'is_series' => $item->is_series,
                                    'rating' => $item->rating,
                                    'runtime' => $item->runtime,
                                    'model_type' => $item::MODEL_TYPE,
                                    'status' => $item->status,
                                    'certification' => $item->certification,
                                    'description' => Str::limit(
                                        $item->description,
                                        200,
                                    ),
                                    'primary_video' => $item->relationLoaded(
                                        'primaryVideo',
                                    )
                                        ? $item->primaryVideo?->toArray()
                                        : null,
                                ],
                                Person::MODEL_TYPE => [
                                    'id' => $item->id,
                                    'name' => $item->name,
                                    'poster' => $item->poster,
                                    'primary_credit' => $item->primary_credit,
                                    'known_for' => $item->known_for,
                                    'birth_date' => $item->birth_date,
                                    'death_date' => $item->death_date,
                                    'model_type' => $item::MODEL_TYPE,
                                    'description' => Str::limit(
                                        $item->description,
                                        200,
                                    ),
                                ],
                                NewsArticle::MODEL_TYPE => [
                                    'id' => $item->id,
                                    'title' => $item->title,
                                    'slug' => $item->slug,
                                    'image' => $item->image,
                                    'source' => $item->source,
                                    'source_url' => $item->source_url,
                                    'byline' => $item->byline,
                                    'model_type' => $item::MODEL_TYPE,
                                    'created_at' => $item->created_at,
                                    'body' => Str::limit($item->body, 340),
                                ],
                            };
                        }),
                ]
                : [
                    'data' => [],
                ],
        ];
    }
}
