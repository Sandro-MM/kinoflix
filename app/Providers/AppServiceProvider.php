<?php

namespace App\Providers;

use App\Actions\AppValueLists;
use App\Models\Channel;
use App\Models\Episode;
use App\Models\NewsArticle;
use App\Models\Person;
use App\Models\Season;
use App\Models\Title;
use App\Services\Admin\GetAnalyticsHeaderData;
use App\Services\AppBootstrapData;
use App\Services\UrlGenerator;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Core\Bootstrap\BootstrapData;
use Common\Core\Contracts\AppUrlGenerator;
use Common\Core\Values\ValueLists;
use Common\Search\ImportRecordsIntoScout;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->app->bind(BootstrapData::class, AppBootstrapData::class);

        Relation::enforceMorphMap([
            Title::MODEL_TYPE => Title::class,
            'movie' => Title::class,
            'series' => Title::class,
            Season::MODEL_TYPE => Season::class,
            Episode::MODEL_TYPE => Episode::class,
            Person::MODEL_TYPE => Person::class,
            NewsArticle::MODEL_TYPE => NewsArticle::class,
            'demo-movie' => Title::class,
            'demo-series' => Title::class,
            'demo-episode' => Episode::class,
        ]);

        Model::preventLazyLoading(!$this->app->isProduction());

        // This will only work when loading from collection, because we need access to channel config
        Channel::resolveRelationUsing(
            'items',
            fn(Channel $channel) => $channel->morphedByMany(
                modelTypeToNamespace(
                    $channel->config['contentModel'] ?? Title::class,
                ),
                'channelable',
            ),
        );

        if (config('common.site.disable_scout_auto_sync')) {
            foreach (ImportRecordsIntoScout::getSearchableModels() as $model) {
                $model::disableSearchSyncing();
            }
        }
    }

    public function register(): void
    {
        // bind analytics
        $this->app->bind(
            GetAnalyticsHeaderDataAction::class,
            GetAnalyticsHeaderData::class,
        );

        $this->app->bind(AppUrlGenerator::class, UrlGenerator::class);

        $this->app->bind(ValueLists::class, AppValueLists::class);
    }
}
