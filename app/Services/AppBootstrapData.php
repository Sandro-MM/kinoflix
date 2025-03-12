<?php namespace App\Services;

use Common\Core\Bootstrap\BaseBootstrapData;

class AppBootstrapData extends BaseBootstrapData
{
    public function init(): self
    {
        parent::init();

        $this->data['settings']['tmdb_is_setup'] = !is_null(config('services.tmdb.key'));

        return $this;
    }
}
