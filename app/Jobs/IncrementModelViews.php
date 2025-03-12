<?php namespace App\Jobs;

use App\Models\Person;
use App\Models\Title;
use Carbon\Carbon;

class IncrementModelViews
{
    public function execute(Person|Title $model): void
    {
        if (!$this->shouldIncrement($model)) {
            return;
        }

        session()->put(
            "{$model->model_type}-views.{$model->model_id}",
            Carbon::now()->timestamp,
        );

        $model->increment('views');
    }

    private function shouldIncrement(Person|Title $model): bool
    {
        $views = session("{$model->model_type}-views");

        // user has not viewed this model yet
        if (!$views || !isset($views[$model->id])) {
            return true;
        }

        // see if user last viewed this model over 10 hours ago
        $time = Carbon::createFromTimestamp($views[$model->id]);

        return Carbon::now()->diffInHours($time) > 10;
    }
}
