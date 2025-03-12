import {Dialog} from '@ui/overlays/dialog/dialog';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {Form} from '@ui/forms/form';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {DialogFooter} from '@ui/overlays/dialog/dialog-footer';
import {Button} from '@ui/buttons/button';
import {FormChipField} from '@ui/forms/input-field/chip-field/form-chip-field';
import {useValueLists} from '@common/http/value-lists';
import {Item} from '@ui/forms/listbox/item';
import {FormDateRangePicker} from '@ui/forms/input-field/date/date-range-picker/form-date-range-picker';
import {FormSelect, Option} from '@ui/forms/select/select';
import {InfoDialogTriggerIcon} from '@ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger-icon';
import React, {Fragment, useState} from 'react';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {
  ImportMultipleFromTmdbFormValue,
  ImportMultipleProgressData,
  useImportMultipleFromTmdb,
} from '@app/admin/titles/requests/use-import-multiple-from-tmdb';
import {ProgressBar} from '@ui/progress/progress-bar';
import {ChipValue} from '@ui/forms/input-field/chip-field/chip-field';
import {Skeleton} from '@ui/skeleton/skeleton';

export function ImportMultipleFromTmdbDialog() {
  const form = useForm<ImportMultipleFromTmdbFormValue>({
    defaultValues: {
      type: 'movie',
      start_from_page: 1,
      pages_to_import: 10,
    },
  });
  const {formId, close} = useDialogContext();
  const importTitles = useImportMultipleFromTmdb();
  const [activePanel, setActivePanel] = useState<'form' | 'progress'>('form');
  const [progressData, setProgressData] =
    useState<ImportMultipleProgressData>();

  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Import from TheMovieDB" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            importTitles.mutate(values, {
              onProgress: data => {
                setActivePanel('progress');
                setProgressData(data);
              },
            });
          }}
        >
          {progressData ? <ProgressPanel data={progressData} /> : <FormPanel />}
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => {
            if (progressData) {
              importTitles.cancel();
              setProgressData(undefined);
              setActivePanel('form');
            } else {
              close();
            }
          }}
        >
          {importTitles.isLoading || activePanel === 'form' ? (
            <Trans message="Cancel" />
          ) : (
            <Trans message="Back" />
          )}
        </Button>
        <Button
          form={formId}
          variant="flat"
          color="primary"
          type="submit"
          disabled={importTitles.isLoading || activePanel === 'progress'}
        >
          <Trans message="Import" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function FormPanel() {
  return (
    <Fragment>
      <p className="mb-24 flex items-center gap-8 text-muted">
        <InfoDialogTriggerIcon size="xs" viewBox="0 0 16 16" />
        <Trans message="All filters below are optional and can be left empty." />
      </p>
      <FormSelect
        name="type"
        label={<Trans message="Type" />}
        className="mb-24"
        selectionMode="single"
      >
        <Option value="movie">
          <Trans message="Movie" />
        </Option>
        <Option value="series">
          <Trans message="Series" />
        </Option>
      </FormSelect>
      <PaginationFields />
      <GenreChipField />
      <KeywordChipField />
      <LanguageSelect />
      <CountrySelect />
      <RatingFields />
      <FormDateRangePicker
        name="release_date"
        granularity="day"
        label={<Trans message="Release date" />}
        description={
          <Trans message="Only import titles released between specified dates." />
        }
      />
    </Fragment>
  );
}

interface ProgressPanelProps {
  data: ImportMultipleProgressData;
}
function ProgressPanel({data}: ProgressPanelProps) {
  return (
    <div>
      <ProgressBar
        value={data.progress}
        label={
          <Trans
            message="Imported :number titles of :total"
            values={{number: data.currentItem, total: data.totalItems}}
          />
        }
      />
      <div className="compact-scrollbar mt-24 h-400 overflow-auto text-xs">
        {data.titleList.map((title, index) => (
          <div key={index}>{title}</div>
        ))}
        {!data.titleList.length ? (
          <Fragment>
            {[...new Array(20).keys()].map(index => (
              <Skeleton className="mb-2 max-w-200" key={index} />
            ))}
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}

function PaginationFields() {
  return (
    <div className="mb-24">
      <div className="flex items-center gap-24">
        <FormTextField
          className="flex-1"
          name="start_from_page"
          label={<Trans message="Starting page" />}
          type="number"
          min={1}
          max={500}
        />
        <FormTextField
          className="flex-1"
          name="pages_to_import"
          label={<Trans message="How many pages to import" />}
          type="number"
          min={1}
          max={500}
        />
      </div>
      <p className="pt-10 text-xs text-muted">
        <Trans message="20 titles per page are imported.  " />
      </p>
    </div>
  );
}

function GenreChipField() {
  const {data} = useFilterValueLists();
  const genres = data?.genres.map(genre => ({
    id: genre.value,
    name: genre.name,
  }));
  return (
    <FormChipField
      className="mb-24"
      name="genres"
      label={<Trans message="Genres" />}
      suggestions={genres}
      allowCustomValue={false}
      description={
        <Trans message="Only import titles belonging to specified genres." />
      }
    >
      {genre => (
        <Item value={genre.id}>
          <Trans message={genre.name} />
        </Item>
      )}
    </FormChipField>
  );
}

function KeywordChipField() {
  const [searchValue, setSearchValue] = useState('');
  const [value, setValue] = useState<ChipValue[]>([]);
  const keywordQuery = useValueLists(['keywords'], {
    searchQuery: searchValue,
    selectedValue: value.map(v => v.id).join(','),
    type: 'tmdb',
  });

  const keywords = keywordQuery.data?.keywords.map(keyword => ({
    id: keyword.value,
    name: keyword.name,
  }));
  return (
    <FormChipField
      name="keywords"
      className="mb-24"
      isAsync
      isLoading={keywordQuery.isLoading}
      inputValue={searchValue}
      onInputValueChange={setSearchValue}
      value={value}
      onChange={setValue}
      label={<Trans message="Keywords" />}
      suggestions={keywords}
      allowCustomValue={false}
      description={
        <Trans message="Only import titles that have specied keywords attached." />
      }
    >
      {keywords?.map(option => (
        <Item key={option.id} value={option.id}>
          <Trans message={option.name} />
        </Item>
      ))}
    </FormChipField>
  );
}

function LanguageSelect() {
  const {data} = useFilterValueLists();
  return (
    <FormSelect
      name="language"
      className="mb-24"
      label={<Trans message="Language" />}
      items={data?.languages}
      selectionMode="single"
      showSearchField
      description={
        <Trans message="Only import titles with specied primary spoken language." />
      }
    >
      {language => (
        <Item value={language.code}>
          <Trans message={language.name} />
        </Item>
      )}
    </FormSelect>
  );
}

function CountrySelect() {
  const {data} = useFilterValueLists();
  return (
    <FormSelect
      name="country"
      className="mb-24"
      label={<Trans message="Country" />}
      items={data?.countries}
      selectionMode="single"
      showSearchField
      description={
        <Trans message="Only import titles with specied origin country." />
      }
    >
      {country => (
        <Item value={country.code}>
          <Trans message={country.name} />
        </Item>
      )}
    </FormSelect>
  );
}

function RatingFields() {
  return (
    <div className="mb-24 flex items-center gap-24">
      <FormTextField
        className="flex-1"
        name="min_rating"
        label={<Trans message="Minimum rating" />}
        type="number"
        min={1}
        max={10}
      />
      <FormTextField
        className="flex-1"
        name="max_rating"
        label={<Trans message="Maximum rating" />}
        type="number"
        min={1}
        max={10}
      />
    </div>
  );
}

function useFilterValueLists() {
  return useValueLists(['genres', 'languages', 'countries'], {
    type: 'tmdb',
  });
}
