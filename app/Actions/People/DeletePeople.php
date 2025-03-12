<?php

namespace App\Actions\People;

use App\Models\Person;
use Illuminate\Support\Facades\DB;

class DeletePeople
{
    public function execute(array $ids): void
    {
        Person::withoutGlobalScope('adult')
            ->whereIn('id', $ids)
            ->delete();
        DB::table('creditables')
            ->whereIn('person_id', $ids)
            ->delete();
    }
}
