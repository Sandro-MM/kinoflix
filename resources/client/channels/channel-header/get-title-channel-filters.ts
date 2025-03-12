import {
  ALL_NUMBER_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@ui/i18n/message';
import {FetchValueListsResponse} from '@common/http/value-lists';
import {dateRangeToAbsoluteRange} from '@ui/forms/input-field/date/date-range-picker/form-date-range-picker';
import {
  DateRangePreset,
  DateRangePresets,
} from '@ui/forms/input-field/date/date-range-picker/dialog/date-range-presets';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';
import {now, parseDateTime} from '@internationalized/date';
import {getUserTimezone} from '@ui/i18n/get-user-timezone';
import {Channel} from '@common/channels/channel';
import {GENRE_MODEL} from '@app/titles/models/genre';
import {PRODUCTION_COUNTRY_MODEL} from '@app/titles/models/production-country';

interface Props {
  languages: FetchValueListsResponse['titleFilterLanguages'];
  countries: FetchValueListsResponse['productionCountries'];
  genres: FetchValueListsResponse['genres'];
  ageRatings: FetchValueListsResponse['titleFilterAgeRatings'];
  restriction?: Channel['restriction'];
}

export const getTitleChannelFilters = ({
  languages,
  countries,
  genres,
  ageRatings,
  restriction,
}: Props): BackendFilter[] => {
  return [
    restriction?.model_type !== GENRE_MODEL
      ? {
          key: 'genres',
          label: message('Genres'),
          defaultOperator: FilterOperator.hasAll,
          control: {
            type: FilterControlType.ChipField,
            placeholder: message('Pick genres'),
            defaultValue: [],
            options: genres.map(genre => ({
              label: message(genre.name),
              key: genre.value,
              value: genre.value,
            })),
          },
        }
      : null,
    {
      key: 'release_date',
      label: message('Release date'),
      defaultOperator: FilterOperator.between,
      control: {
        type: FilterControlType.DateRangePicker,
        defaultValue: dateRangeToAbsoluteRange(
          (DateRangePresets[9] as Required<DateRangePreset>).getRangeValue(),
        ),
        min: parseDateTime('1900-01-01'),
        max: now(getUserTimezone()).add({years: 5}),
      },
    },
    {
      control: {
        type: FilterControlType.Input,
        inputType: 'number',
        minValue: 1,
        maxValue: 10,
        defaultValue: 7,
      },
      key:
        getBootstrapData().settings.content.title_provider !== 'tmdb'
          ? 'tmdb_vote_average'
          : 'local_vote_average',
      label: message('User rating'),
      defaultOperator: FilterOperator.gte,
      operators: ALL_NUMBER_OPERATORS,
    },
    {
      key: 'runtime',
      label: message('Runtime'),
      description: message('Runtime in minutes'),
      defaultOperator: FilterOperator.lte,
      operators: ALL_NUMBER_OPERATORS,
      control: {
        type: FilterControlType.Input,
        inputType: 'number',
        minValue: 1,
        maxValue: 255,
        defaultValue: 180,
      },
    },
    {
      key: 'language',
      label: message('Original language'),
      defaultOperator: FilterOperator.eq,
      control: {
        type: FilterControlType.Select,
        placeholder: message('Pick a language'),
        searchPlaceholder: message('Search for language'),
        showSearchField: true,
        options: languages.map(({name, value}) => ({
          label: message(name),
          key: value,
          value: value,
        })),
      },
    },
    restriction?.model_type !== PRODUCTION_COUNTRY_MODEL
      ? {
          control: {
            type: FilterControlType.ChipField,
            placeholder: message('Pick countries'),
            defaultValue: [],
            options: countries?.map(({name, value}) => ({
              label: message(name),
              key: value,
              value: value,
            })),
          },
          key: 'productionCountries',
          label: message('Production countries'),
          defaultOperator: FilterOperator.hasAll,
        }
      : null,
    {
      key: 'certification',
      label: message('Age rating'),
      defaultOperator: FilterOperator.eq,
      control: {
        type: FilterControlType.Select,
        placeholder: message('Pick an age rating'),
        showSearchField: true,
        searchPlaceholder: message('Search for age rating'),
        options: ageRatings.map(({name, value}) => ({
          label: message(name),
          key: value,
          value: value,
        })),
      },
    },
    {
      key: 'budget',
      label: message('Budget'),
      description: message('Budget in US dollars'),
      defaultOperator: FilterOperator.lte,
      operators: ALL_NUMBER_OPERATORS,
      control: {
        type: FilterControlType.Input,
        inputType: 'number',
        minValue: 1,
        maxValue: 1000000000,
        defaultValue: 100000000,
      },
    },
    {
      key: 'revenue',
      label: message('Revenue'),
      description: message('Revenue in US dollars'),
      defaultOperator: FilterOperator.lte,
      operators: ALL_NUMBER_OPERATORS,
      control: {
        type: FilterControlType.Input,
        inputType: 'number',
        minValue: 1,
        maxValue: 1000000000,
        defaultValue: 100000000,
      },
    },
  ].filter(Boolean) as BackendFilter[];
};
