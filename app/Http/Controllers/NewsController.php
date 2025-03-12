<?php

namespace App\Http\Controllers;

use App\Actions\News\ImportNewsFromRemoteProvider;
use App\Models\NewsArticle;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Str;

class NewsController extends BaseController
{
    public function index()
    {
        $this->authorize('show', NewsArticle::class);

        $paginator = new Datasource(NewsArticle::query(), request()->all());

        $pagination = $paginator->paginate();

        if (request('stripHtml') || request('truncateBody')) {
            $pagination
                ->map(function (NewsArticle $article) {
                    if (request('stripHtml')) {
                        // remove html tags
                        $article->body = strip_tags($article->body);

                        // remove last "...see full article"
                        $parts = explode('...', $article->body);
                        if (
                            count($parts) > 1 &&
                            Str::contains(last($parts), 'See full article')
                        ) {
                            array_pop($parts);
                        }
                        $article->body = implode('', $parts);
                    }

                    if ($newLength = (int) request('truncateBody')) {
                        $article->body = Str::limit($article->body, $newLength);
                    }

                    return $article;
                })
                ->values();
        }

        return $this->success(['pagination' => $pagination]);
    }

    public function show($slugOrId)
    {
        $article = NewsArticle::where('id', $slugOrId)
            ->orWhere('slug', $slugOrId)
            ->firstOrFail();

        $this->authorize('show', $article);

        $data = [
            'article' => $article,
            'related' => NewsArticle::compact()
                ->where('id', '!=', $article->id)
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get(),
            'loader' => 'newsArticlePage',
        ];

        return $this->renderClientOrApi([
            'pageName' => 'news-article-page',
            'data' => $data,
        ]);
    }

    public function update($id)
    {
        $article = NewsArticle::findOrFail($id);

        $this->authorize('update', $article);

        $data = $this->validate(request(), [
            'title' => 'min:5|max:250',
            'body' => 'min:5',
            'image' => 'string',
            'slug' => 'string',
        ]);

        $article->fill($data)->save();

        return $this->success(['article' => $article]);
    }

    public function store()
    {
        $this->authorize('store', NewsArticle::class);

        $data = $this->validate(request(), [
            'title' => 'required|min:5|max:250',
            'body' => 'required|min:5',
            'image' => 'string',
            'slug' => 'required|string',
        ]);

        $article = NewsArticle::create($data);

        return $this->success(['article' => $article]);
    }

    public function destroy(string $ids)
    {
        $ids = explode(',', $ids);
        $this->authorize('destroy', NewsArticle::class);

        NewsArticle::whereIn('id', $ids)->delete();

        return $this->success();
    }

    public function importFromRemoteProvider()
    {
        $this->authorize('store', NewsArticle::class);

        app(ImportNewsFromRemoteProvider::class)->execute();

        return $this->success();
    }
}
