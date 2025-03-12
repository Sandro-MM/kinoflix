<?php

namespace App\Actions\News;

use App\Models\NewsArticle;
use App\Models\Person;
use App\Models\Title;
use App\Services\Data\News\ImdbNewsProvider;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImportNewsFromRemoteProvider
{
    public function execute(): void
    {
        $newArticles = collect(
            app(ImdbNewsProvider::class)->getArticles(),
        )->map(function ($article) {
            $article['slug'] = slugify(Str::limit($article['title'], 50));
            return $article;
        });

        $existing = NewsArticle::whereIn(
            'slug',
            $newArticles->pluck('slug'),
        )->get();

        // filter out already existing articles
        $newArticles = $newArticles
            ->filter(
                fn($newArticle) => !$existing->first(
                    fn($existingArticle) => $existingArticle['title'] ===
                        $newArticle['title'] ||
                        $existingArticle['slug'] === $newArticle['slug'],
                ),
            )
            ->unique('slug');

        $articlesPayload = $newArticles->map(function ($article, $index) {
            $date = isset($article['date'])
                ? Carbon::parse($article['date'])
                : Carbon::now();
            return [
                'title' => $article['title'],
                'body' => $article['body'],
                'slug' => $article['slug'],
                'image' => $article['image'] ?? null,
                'source' => $article['source'] ?? null,
                'source_url' => $article['source_url'] ?? null,
                'byline' => $article['byline'] ?? null,
                'created_at' => $date,
                'updated_at' => $date,
            ];
        });

        NewsArticle::insert($articlesPayload->toArray());
        $this->attachArticlesToRelatedModels($newArticles);
    }

    protected function attachArticlesToRelatedModels(Collection $articles): void
    {
        // fetch inserted articles from db
        $dbArticles = NewsArticle::whereIn(
            'slug',
            $articles->pluck('slug'),
        )->get(['id', 'slug']);

        $titleImdbIds = [];
        $personImdbIds = [];

        // generate [article_slug => [imdb_id, imdb_id, ...]] arrays
        foreach ($articles as $article) {
            if (isset($article['imdb_title_ids'])) {
                foreach ($article['imdb_title_ids'] as $imdbTitleId) {
                    $titleImdbIds[$article['slug']][] = $imdbTitleId;
                }
            }
            if (isset($article['imdb_person_ids'])) {
                foreach ($article['imdb_person_ids'] as $imdbPersonId) {
                    $personImdbIds[$article['slug']][] = $imdbPersonId;
                }
            }
        }

        // fetch titles and people by imdb_id as [imdb_id => id] arrays
        $titles = Title::whereIn(
            'imdb_id',
            collect($titleImdbIds)
                ->values()
                ->flatten(),
        )
            ->pluck('id', 'imdb_id')
            ->toArray();
        $people = Person::whereIn(
            'imdb_id',
            collect($personImdbIds)
                ->values()
                ->flatten(),
        )
            ->pluck('id', 'imdb_id')
            ->toArray();

        // generate titles payload for pivot table
        $payload = [];
        foreach ($titleImdbIds as $slug => $imdbIds) {
            foreach ($imdbIds as $imdbId) {
                if (isset($titles[$imdbId])) {
                    $payload[] = [
                        'article_id' => $dbArticles->firstWhere('slug', $slug)
                            ->id,
                        'model_id' => $titles[$imdbId],
                        'model_type' => Title::MODEL_TYPE,
                    ];
                }
            }
        }

        // generate people payload for pivot table
        foreach ($personImdbIds as $slug => $imdbIds) {
            foreach ($imdbIds as $imdbId) {
                if (isset($people[$imdbId])) {
                    $payload[] = [
                        'article_id' => $dbArticles->firstWhere('slug', $slug)
                            ->id,
                        'model_id' => $people[$imdbId],
                        'model_type' => Person::class,
                    ];
                }
            }
        }

        DB::table('news_article_models')->insert($payload);
    }
}
