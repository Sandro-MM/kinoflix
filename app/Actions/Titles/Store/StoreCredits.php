<?php

namespace App\Actions\Titles\Store;

use App\Models\Episode;
use App\Models\Person;
use App\Models\Season;
use App\Models\Title;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StoreCredits
{
    public const UNIQUE_KEY = 'tmdb_id';

    private Title|Episode|Season|Person|null $model = null;

    public function __construct(private Person $person, private Title $title)
    {
    }

    /**
     * @param array $originalMediaItems
     */
    public function execute(Title|Episode|Season|Person $model, $originalMediaItems)
    {
        $this->model = $model;

        if (empty($originalMediaItems)) return;

        // generate records we will insert into "creditables" pivot table
        $newPivotRecords = $this->generatePivotRecords($originalMediaItems);
        if ($newPivotRecords->isEmpty()) return;

        // fetch all existing "creditable" pivot rows for this creditable
        $existingPivotRecords = $this->getExistingRecords($newPivotRecords);

        // merge new and existing pivot records, so "order" column value is not lost
        $mergedPivotRecords = $this->mergeNewAndExistingRecords($existingPivotRecords, $newPivotRecords);

        // delete all "creditables" pivot table records for this creditable
        $this->detachExistingRecords($existingPivotRecords);

        // insert new pivot records
        try {
            DB::table('creditables')->insert($mergedPivotRecords->toArray());
        } catch (UniqueConstraintViolationException $e) {
            Log::error($e->getMessage());
        }
    }

    /**
     * @param array $originalMediaItems
     * @return Collection
     */
    private function generatePivotRecords($originalMediaItems)
    {
        // need to remove series, otherwise it will attach all guest starts to main series, because
        // tmdb API does not specify whether credit belongs to series, season or episode.
        $originalMediaItems = $this->filterOutSeries($originalMediaItems);
        $dbMediaItems = $this->insertOrRetrieveMediaItems($originalMediaItems);

        return collect($originalMediaItems)->map(function($originalMediaItem) use($dbMediaItems) {
            $creditable = $dbMediaItems->first(fn($item, $uniqueKey) => $uniqueKey === $originalMediaItem[self::UNIQUE_KEY] && $item['is_series'] === Arr::get($originalMediaItem, 'is_series'));

            if ( ! $creditable) return null;

            // either attaching multiple titles to a person
            // or attaching multiple people to title/season/episode
            if ($this->model->model_type === Person::MODEL_TYPE) {
                $personId = $this->model->id;
                $creditableId = $creditable->id;
            } else {
                $personId = $creditable->id;
                $creditableId = $this->model->id;
            }

            // build relation records for attaching all credits to title
            // (same person might be attached to title multiple times)
            return [
                'id' => null,
                'person_id' => $personId,
                'creditable_id' => $creditableId,
                'creditable_type' => $this->getCreditableType(),
                'character' => Arr::get($originalMediaItem, 'relation_data.character'),
                'order' => Arr::get($originalMediaItem, 'relation_data.order'),
                'department' => Arr::get($originalMediaItem, 'relation_data.department'),
                'job' => Arr::get($originalMediaItem, 'relation_data.job'),
            ];
        })->filter()->values();
    }

    /**
     * Merge existing "creditables" pivot table records with the ones
     * we are about to insert. This needs to be done because sometimes
     * "order" property does not exist on "new" records, but exists on
     * "old" ones and since we will delete "old" ones, "order" would be lost.
     *
     * @param Collection $existingRecords
     * @param Collection $newRecords
     * @return Collection
     */
    private function mergeNewAndExistingRecords($existingRecords, $newRecords)
    {
        // all of these properties on both arrays must match for them to be considered equal
        $matchProps = collect(['person_id', 'creditable_id', 'creditable_type', 'character', 'department', 'job']);

        return $newRecords->map(function($newRecord) use($existingRecords, $matchProps) {
            $oldRecord = $existingRecords->first(fn($existingRecord) => $matchProps->every(fn($prop) => $existingRecord[$prop] === $newRecord[$prop]), []);
            return $this->arrayMergeIfNotNull($newRecord, $oldRecord);
        });
    }

    /**
     * @param array $arr1
     * @param array $arr2
     * @return array
     */
    private function arrayMergeIfNotNull($arr1, $arr2) {
        foreach($arr2 as $key => $val) {
            $is_set_and_not_null = isset($arr1[$key]);
            if ( $val == null && $is_set_and_not_null ) {
                $arr2[$key] = $arr1[$key];
            }
        }
        return array_merge($arr1, $arr2);
    }

    /**
     * Insert or retrieve titles or people that need to be attached.
     *
     * @param Collection|(Title|Person)[] $mediaItems
     * @return Collection
     */
    private function insertOrRetrieveMediaItems(Collection|array $mediaItems)
    {
        // make sure we only insert person/title once, even
        // if they appear multiple time in title credits
        $uniqueMediaItems = collect($mediaItems)->unique(self::UNIQUE_KEY)->values();

        if ($uniqueMediaItems->isEmpty()) return collect();

        if ($uniqueMediaItems[0]['model_type'] === Person::MODEL_TYPE) {
            $mediaItems = $this->person->insertOrRetrieve($uniqueMediaItems);
        } else {
            $mediaItems =  $this->title->insertOrRetrieve($uniqueMediaItems);
        }

        return $mediaItems->mapWithKeys(fn($item) => [$item[self::UNIQUE_KEY] => $item]);
    }

    /**
     * @param Collection $records
     * @return Collection
     */
    private function getExistingRecords($records)
    {
        // select only fields needed to do the diff
        return DB::table('creditables')
            ->whereIn('person_id', $records->pluck('person_id'))
            ->whereIn('job', $records->pluck('job'))
            ->where('creditable_type', $records[0]['creditable_type'])
            ->whereIn('creditable_id', $records->pluck('creditable_id'))
            ->get()
            ->map(fn($record) => (array) $record);
    }

    /**
     * Delete creditable records that already exist.
     *
     * @param Collection $records
     */
    private function detachExistingRecords($records)
    {
        if ($records->isEmpty()) return;

        // select only fields needed to do the diff
        $existingRecords = DB::table('creditables')
            ->whereIn('person_id', $records->pluck('person_id'))
            ->whereIn('job', $records->pluck('job'))
            ->where('creditable_type', $records[0]['creditable_type'])
            ->whereIn('creditable_id', $records->pluck('creditable_id'))
            ->get();

        DB::table('creditables')->whereIn('id', $existingRecords->pluck('id'))->delete();
    }

    /**
     * Get creditable type for morphToMany or morphedByMany relation.
     */
    private function getCreditableType(): string
    {
        if ($this->model::class === Person::class) {
            // won't be attaching seasons or episodes here
            // so can just return title type instantly
            return Title::MODEL_TYPE;
        } else {
            return $this->model::MODEL_TYPE;
        }
    }

    /**
     * Remove all series and episodes from specified array.
     *
     * @param array $originalMediaItems
     * @return array
     */
    private function filterOutSeries($originalMediaItems)
    {
        return array_filter($originalMediaItems, fn($creditable) => !Arr::get($creditable, 'is_series'));
    }
}
