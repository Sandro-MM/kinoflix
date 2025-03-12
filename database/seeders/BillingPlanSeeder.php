<?php

namespace Database\Seeders;

use Common\Billing\BillingPlan;
use Common\Billing\Models\Product;
use Common\Billing\Products\Actions\CrupdateProduct;
use Illuminate\Database\Seeder;

class BillingPlanSeeder extends Seeder
{
    protected array $sharedFeatures = [
        'No advertisements',
        'Watch on laptop, TV, phone and tablet',
        'Unlimited movies and TV shows',
        'Cancel anytime',
        'First month free',
    ];

    public function run(): void
    {
        if (!Product::count()) {
            $this->basicPlan();
            $this->standardPlan();
            $this->proPlan();
        }
    }

    protected function basicPlan(): void
    {
        app(CrupdateProduct::class)->execute([
            'name' => 'Basic',
            'amount' => 7.99,
            'position' => 1,
            'feature_list' => [
                ...$this->sharedFeatures,
                '1 screen(s) at the same time',
            ],
            'prices' => [
                [
                    'amount' => 7.99,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 1,
                ],
                [
                    'amount' => 76.70,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 12,
                ],
            ],
        ]);
    }

    protected function standardPlan(): void
    {
        app(CrupdateProduct::class)->execute([
            'name' => 'Standard',
            'position' => 2,
            'recommended' => true,
            'feature_list' => [
                ...$this->sharedFeatures,
                '2 screen(s) at the same time',
                'HD available',
            ],
            'prices' => [
                [
                    'amount' => 9.99,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 1,
                ],
                [
                    'amount' => 95.90,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 12,
                ],
            ],
        ]);
    }

    protected function proPlan(): void
    {
        app(CrupdateProduct::class)->execute([
            'name' => 'Pro',
            'position' => 3,
            'feature_list' => [
                ...$this->sharedFeatures,
                '4 screen(s) at the same time',
                'HD available',
                'Ultra HD available',
            ],
            'prices' => [
                [
                    'amount' => 11.99,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 1,
                ],
                [
                    'amount' => 115.10,
                    'currency' => 'USD',
                    'interval' => 'month',
                    'interval_count' => 12,
                ],
            ],
        ]);
    }
}
