<?php

namespace App\Models;

use App\Actions\Channels\FetchContentFromLocalDatabase;
use App\Actions\Channels\FetchContentFromTmdb;
use App\Actions\People\PaginatePeople;
use App\Actions\Titles\Retrieve\PaginateTitles;
use Common\Channels\BaseChannel;
use Common\Database\Datasource\Datasource;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Channel extends BaseChannel
{
    protected $casts = [
        'id' => 'integer',
        'public' => 'boolean',
        'internal' => 'boolean',
        'user_id' => 'integer',
    ];

    protected $hidden = ['pivot'];

    public function allTitles(array $params, $builder = null): AbstractPaginator
    {
        if (!$builder && $this->restriction) {
            $builder = $this->restriction->titles();
        }
        return (new PaginateTitles())->execute($params, $builder);
    }

    public function allMovies(array $params, $builder = null)
    {
        if (!$builder && $this->restriction) {
            $builder = $this->restriction->titles();
        }
        $params['type'] = Title::MOVIE_TYPE;
        return (new PaginateTitles())->execute($params, $builder);
    }

    public function allSeries(array $params, $builder = null)
    {
        if (!$builder && $this->restriction) {
            $builder = $this->restriction->titles();
        }
        $params['type'] = Title::SERIES_TYPE;
        return (new PaginateTitles())->execute($params, $builder);
    }

    public function titles(): MorphToMany
    {
        return $this->channelableRelation(Title::class);
    }

    public function movies(): MorphToMany
    {
        return $this->channelableRelation(Title::class)->where(
            'titles.is_series',
            false,
        );
    }

    public function series(): MorphToMany
    {
        return $this->channelableRelation(Title::class)->where(
            'titles.is_series',
            true,
        );
    }

    public function people(): MorphToMany
    {
        return $this->channelableRelation(Person::class);
    }

    public function allPeople(
        array $params,
        mixed $builder = null,
        Channel $parentChannel = null,
    ): AbstractPaginator {
        $params['compact'] = !is_null($parentChannel);
        return (new PaginatePeople())->execute($params, $builder);
    }

    public function newsArticles(): MorphToMany
    {
        return $this->channelableRelation(NewsArticle::class)->select([
            'news_articles.id',
            'news_articles.title',
            'news_articles.created_at',
        ]);
    }

    public function allNewsArticles(
        array $params,
        mixed $builder = null,
    ): AbstractPaginator {
        $datasource = new Datasource($builder ?? NewsArticle::query(), $params);

        $paginator = $datasource->paginate();

        $paginator->transform(function (NewsArticle $article) {
            $article->body = Str::limit(strip_tags($article->body), 400);
            return $article;
        });

        return $paginator;
    }

    protected function loadContentFromExternal(
        string $autoUpdateMethod,
    ): Collection|array|null {
        $provider = Arr::get($this->config, 'autoUpdateProvider', 'local');
        $modelType = Arr::get($this->config, 'contentModel', 'movie');

        $filters = [];
        if (isset($this->config['restriction'])) {
            $filters[$this->config['restriction']] =
                $this->config['restrictionModelId'];
        }

        if ($provider === 'tmdb') {
            $keywords = collect();
            if (isset($filters['keyword'])) {
                $keywords->push($filters['keyword']);
            }
            if (isset($this->config['tmdb_keywords'])) {
                $keywords = $keywords
                    ->merge($this->config['tmdb_keywords'])
                    ->unique();
            }
            if (isset($this->config['tmdb_language'])) {
                $filters['language'] = $this->config['tmdb_language'];
            }
            if ($keywords->isNotEmpty()) {
                $filters['keyword'] = $keywords->implode(',');
            }

            return app(FetchContentFromTmdb::class)->execute(
                $autoUpdateMethod,
                $modelType,
                $filters,
            );
        } else {
            return app(FetchContentFromLocalDatabase::class)->execute(
                $autoUpdateMethod,
                $modelType,
                $filters,
            );
        }
    }

    protected function channelableRelation(string $type): MorphToMany
    {
        return $this->morphedByMany(
            $type,
            'channelable',
            null,
            'channel_id',
        )->withPivot(['id', 'channelable_id', 'order']);
    }

    public function resolveRouteBinding($value, $field = null)
    {
        $type = request('channelType');
        if ($value === 'watchlist') {
            if (!Auth::check()) {
                abort(401);
            }
            $channel = Auth::user()
                ->watchlist()
                ->firstOrFail();
        } elseif (ctype_digit($value)) {
            $channel = app(Channel::class)
                ->when($type, fn($q) => $q->where('type', $type))
                ->findOrFail($value);
        } else {
            $channel = app(Channel::class)
                ->where('slug', $value)
                ->when($type, fn($q) => $q->where('type', $type))
                ->firstOrFail();
        }

        if ($channel->type === 'list') {
            $channel->load('user');
        }

        return $channel;
    }
}
