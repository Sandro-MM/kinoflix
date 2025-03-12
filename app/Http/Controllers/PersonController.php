<?php

namespace App\Http\Controllers;

use App\Actions\People\DeletePeople;
use App\Actions\People\GetPersonCredits;
use App\Actions\People\PaginatePeople;
use App\Jobs\IncrementModelViews;
use App\Models\Person;
use Common\Core\BaseController;
use Illuminate\Support\Arr;

class PersonController extends BaseController
{
    public function index()
    {
        $this->authorize('index', Person::class);

        $pagination = (new PaginatePeople())->execute(request()->all());

        return $this->success(['pagination' => $pagination]);
    }

    public function show($id, $name = null)
    {
        $this->authorize('show', Person::class);

        $loader = request('loader', 'personPage');

        if (is_numeric($id) || ctype_digit($id)) {
            $person = Person::findOrFail($id);
        } else {
            $person = Person::firstOrCreateFromEncodedTmdbId($id);
        }

        if ($loader === 'personPage' && requestIsFromFrontend()) {
            $person->maybeUpdateFromExternal();
        }

        $data = array_merge(
            ['person' => $person, 'loader' => $loader],
            app(GetPersonCredits::class)->execute($person),
        );

        (new IncrementModelViews())->execute($data['person']);

        return $this->renderClientOrApi([
            'data' => $data,
            'pageName' => 'person-page',
        ]);
    }

    public function store()
    {
        $this->authorize('store', Person::class);

        $data = request()->all();
        $data['popularity'] = Arr::get($data, 'popularity') ?: 50;
        $person = Person::create($data);

        return $this->success(['person' => $person]);
    }

    public function update($id)
    {
        $this->authorize('update', Person::class);

        $person = Person::findOrFail($id);

        $data = request()->all();
        $data['popularity'] = Arr::get($data, 'popularity') ?: 50;
        $person->fill($data)->save();

        return $this->success(['person' => $person]);
    }

    public function destroy(string $ids)
    {
        $ids = explode(',', $ids);
        $this->authorize('destroy', Person::class);

        app(DeletePeople::class)->execute($ids);

        return $this->success();
    }
}
