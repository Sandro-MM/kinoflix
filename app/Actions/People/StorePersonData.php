<?php

namespace App\Actions\People;

use App\Actions\Titles\Store\StoreCredits;
use App\Actions\Titles\StoresMediaImages;
use App\Models\Person;

class StorePersonData
{
    use StoresMediaImages;

    private ?Person $person = null;

    private ?array $data = null;

    public function execute(Person $person, array $data): Person
    {
        $this->person = $person;
        $this->data = $data;

        $this->persistData();
        $this->persistRelations();

        return $this->person;
    }

    private function persistData(): void
    {
        $personData = array_filter($this->data, function (
            $value, // make sure we don't overwrite existing values with null
        ) {
            if (is_array($value)) {
                return false;
            }

            // if fully_synced is true, override everything and erase any previously set values.
            // For example if "death_date" was previously set on a person and tmdb now returns null for "death_date", set "death_date" to null in database.
            if (
                config('common.site.tmdb_delete_when_sync') &&
                $this->data['fully_synced']
            ) {
                return true;
            }

            // if "tmdb_delete_when_sync" is false, don't clear existing values, as values set from admin manually might be erased
            return !is_null($value);
        });

        $this->person->fill($personData)->save();
    }

    private function persistRelations(): void
    {
        $relations = array_filter($this->data, fn($value) => is_array($value));

        foreach ($relations as $name => $values) {
            switch ($name) {
                case 'credits':
                    app(StoreCredits::class)->execute($this->person, $values);
                    break;
                case 'images':
                    $this->storeImages($values, $this->person);
                    break;
            }
        }
    }
}
