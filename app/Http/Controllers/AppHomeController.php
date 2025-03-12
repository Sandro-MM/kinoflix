<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Auth;
use Common\Billing\Models\Product;
use Common\Core\BaseController;
use Illuminate\Support\Str;

class AppHomeController extends BaseController
{
    public function __invoke()
    {
        if (
            Str::startsWith(settings('homepage.type'), 'channel') ||
            (Auth::check() && settings('homepage.type') === 'landingPage')
        ) {
            return app(FallbackRouteController::class)->renderChannel(
                settings('homepage.value'),
            );
        } else {
            return $this->renderClientOrApi([
                'pageName' => 'landing-page',
                'data' => [
                    'loader' => 'landingPage',
                    'products' => Product::with(['permissions', 'prices'])
                        ->limit(15)
                        ->orderBy('position', 'asc')
                        ->get(),
                    'trendingTitles' => Title::orderBy('popularity', 'desc')
                        ->compact()
                        ->limit(6)
                        ->get(),
                ],
            ]);
        }
    }
}
