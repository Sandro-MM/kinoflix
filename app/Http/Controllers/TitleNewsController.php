<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Common\Core\BaseController;

class TitleNewsController extends BaseController
{
    public function __invoke(Title $title)
    {
        $this->authorize('show', $title);

        $articles = $title->load([
            'newsArticles' => fn($q) => $q->limit(4),
        ])->newsArticles;

        return $this->success(['news_articles' => $articles]);
    }
}
