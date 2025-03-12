<?php

namespace App\Actions\Demo;

use App\Models\Title;
use App\Models\User;
use Common\Files\Traits\HandlesEntryPaths;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Output\ConsoleOutput;

class GenerateDemoReviews
{
    use HandlesEntryPaths;

    private Collection $users;

    public function execute(): void
    {
        DB::table('review_reports')->truncate();
        DB::table('review_feedback')->truncate();
        DB::table('reviews')->truncate();

        $demoEmails = collect(
            json_decode(
                file_get_contents(app_path('Actions/Demo/demo-users.json')),
                true,
            ),
        )->pluck('email');
        $this->users = User::whereIn('email', $demoEmails)->get();

        $this->generateFor('movie');
        $this->generateFor('series');
    }

    protected function generateFor(string $type): void
    {
        $output = new ConsoleOutput();
        $output->write("Generating reviews for $type", true);

        $userSequence = new Sequence(...$this->users->pluck('id')->toArray());

        $data = json_decode(
            file_get_contents(app_path("Actions/Demo/demo-$type-reviews.json")),
            true,
        );

        // generate reviews that are shared between all movies/series on demo site
        $reviews = collect($data)->map(function ($review) use (
            $userSequence,
            $type,
        ) {
            $date = now()
                ->subMonth(rand(0, 2))
                ->subDays(rand(1, 12));
            return [
                'user_id' => $userSequence(),
                'title' => $review['title'],
                'body' => $review['body'],
                'score' => $review['score'],
                'has_text' => true,
                'helpful_count' => rand(10, 200),
                'not_helpful_count' => rand(0, 20),
                'created_at' => $date,
                'updated_at' => $date,
                'reviewable_id' => 0,
                'reviewable_type' => "demo-$type",
            ];
        });

        DB::table('reviews')->insert($reviews->toArray());

        // generate 42 reviews and attach to most popular movies/series
        $items = Title::where('is_series', $type === 'series')
            ->orderBy('popularity', 'desc')
            ->limit(42)
            ->get();

        $reviews = collect($data)
            ->take($items->count())
            ->map(function ($review, $index) use (
                $userSequence,
                $type,
                $items,
            ) {
                $date = now()
                    ->subMonth(rand(0, 2))
                    ->subDays(rand(1, 12));
                return [
                    'user_id' => $userSequence(),
                    'title' => $review['title'],
                    'body' => $review['body'],
                    'score' => $review['score'],
                    'has_text' => true,
                    'helpful_count' => rand(10, 200),
                    'not_helpful_count' => rand(0, 20),
                    'created_at' => $date,
                    'updated_at' => $date,
                    'reviewable_id' => $items[$index]->id,
                    'reviewable_type' => $type,
                ];
            });
        DB::table('reviews')->insert($reviews->toArray());
    }
}
