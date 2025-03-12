<?php

namespace App\Http\Controllers;

use App\Actions\Titles\Retrieve\PaginateSeasonEpisodes;
use App\Models\Title;
use Common\Core\BaseController;

class SeasonEpisodesController extends BaseController
{
    public function __invoke(Title $title, int $seasonNumber)
    {
        $this->authorize('show', $title);

        $pagination = app(PaginateSeasonEpisodes::class)->execute(
            $title,
            $seasonNumber,
            request()->all(),
        );

        return $this->success(['pagination' => $pagination]);
    }
}
