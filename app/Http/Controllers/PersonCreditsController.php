<?php

namespace App\Http\Controllers;

use App\Actions\People\GetPersonCredits;
use App\Models\Person;
use Common\Core\BaseController;
use Illuminate\Support\Arr;

class PersonCreditsController extends BaseController
{
    public function fullTitleCredits(
        Person $person,
        int $titleId,
        string $department,
    ) {
        $this->authorize('show', Person::class);

        $credits = app(GetPersonCredits::class)->execute($person, [
            'titleId' => $titleId,
        ]);

        $title = Arr::first(
            $credits['credits'][$department],
            fn($title) => $title['id'] === (int) $titleId,
        );

        return $this->success(['credits' => $title['episodes']]);
    }
}
