<?php

namespace App\Actions\Demo;

use App\Models\Episode;
use App\Models\Title;
use App\Models\User;
use Common\Files\Traits\HandlesEntryPaths;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Output\ConsoleOutput;

class GenerateDemoComments
{
    use HandlesEntryPaths;

    private Collection $users;

    public function execute(string $variant = null): void
    {
        DB::table('comments')->truncate();
        DB::table('comment_reports')->truncate();
        DB::table('comment_votes')->truncate();

        $demoEmails = collect(
            json_decode(
                file_get_contents(app_path('Actions/Demo/demo-users.json')),
                true,
            ),
        )->pluck('email');
        $this->users = User::whereIn('email', $demoEmails)->get();

        if ($variant === 'anime') {
            $this->generateFor(
                'movie',
                app_path('Actions/Demo/demo-anime-comments.json'),
            );
            $this->generateFor(
                'series',
                app_path('Actions/Demo/demo-anime-comments.json'),
            );
            $this->generateFor(
                'episode',
                app_path('Actions/Demo/demo-anime-comments.json'),
            );
        } else {
            $this->generateFor(
                'movie',
                app_path('Actions/Demo/demo-movie-comments.json'),
            );
            $this->generateFor(
                'series',
                app_path('Actions/Demo/demo-series-comments.json'),
            );
            $this->generateFor(
                'episode',
                app_path('Actions/Demo/demo-episode-comments.json'),
            );
        }
    }

    protected function generateFor(string $type, string $path): void
    {
        $output = new ConsoleOutput();
        $output->write('Generating demo comments', true);

        $userSequence = new Sequence(...$this->users->pluck('id')->toArray());

        $data = json_decode(file_get_contents($path), true);
        $lastId = DB::table('comments')->max('id') ?? 0;

        // generate comments that are shared between all items on demo site
        $itemComments = collect($data)->map(function ($comment, $index) use (
            $userSequence,
            $type,
            $lastId,
        ) {
            $date = now()
                ->subMonth(rand(0, 2))
                ->subDays(rand(1, 12));
            return [
                'id' => $lastId + $index + 1,
                'path' => $this->encodePath($lastId + $index + 1),
                'user_id' => $userSequence(),
                'content' => $comment['comment'],
                'upvotes' => rand(5, 200),
                'downvotes' => rand(0, 20),
                'reports_count' => rand(0, 3),
                'created_at' => $date,
                'updated_at' => $date,
                'commentable_id' => 0,
                'commentable_type' => "demo-$type",
            ];
        });
        DB::table('comments')->insert($itemComments->toArray());

        // generate 42 comments and attach to most popular movies/series
        $model =
            $type === 'episode'
                ? Episode::orderBy('tmdb_vote_count', 'desc')
                : Title::where('is_series', $type === 'series')->orderBy(
                    'popularity',
                    'desc',
                );
        $items = $model->limit(42)->get();
        $lastId = DB::table('comments')->max('id') ?? 0;

        $comments = collect($data)
            ->take($items->count())
            ->map(function ($comment, $index) use (
                $userSequence,
                $type,
                $items,
                $lastId,
            ) {
                $date = now()
                    ->subMonth(rand(0, 2))
                    ->subDays(rand(1, 12));
                return [
                    'id' => $lastId + $index + 1,
                    'path' => $this->encodePath($lastId + $index + 1),
                    'user_id' => $userSequence(),
                    'content' => $comment['comment'],
                    'upvotes' => rand(5, 200),
                    'downvotes' => rand(0, 20),
                    'reports_count' => rand(0, 3),
                    'created_at' => $date,
                    'updated_at' => $date,
                    'commentable_id' => $items[$index]->id,
                    'commentable_type' => "demo-$type",
                ];
            });
        DB::table('comments')->insert($comments->toArray());
    }
}
