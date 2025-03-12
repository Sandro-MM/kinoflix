import {
  ALL_NUMBER_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@ui/i18n/message';
import {
  createdAtFilter,
  timestampFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const PeopleDatatableFilters: BackendFilter[] = [
  {
    key: 'known_for',
    label: message('Known for'),
    description: message('What role is person known for'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'acting',
      options: [
        {
          label: message('Acting'),
          key: 'acting',
          value: 'acting',
        },
        {
          label: message('Directing'),
          key: 'directing',
          value: 'directing',
        },
        {
          label: message('Production'),
          key: 'production',
          value: 'production',
        },
        {label: message('Writing'), key: 'writing', value: 'writing'},
        {label: message('Crew'), key: 'crew', value: 'crew'},
        {label: message('Art'), key: 'art', value: 'art'},
        {
          label: message('Costume & Make-Up'),
          key: 'Costume & Make-Up',
          value: 'Costume & Make-Up',
        },
        {label: message('Camera'), key: 'camera', value: 'camera'},
        {label: message('Editing'), key: 'editing', value: 'editing'},
        {
          label: message('Visual Effects'),
          key: 'visual effects',
          value: 'visual effects',
        },
        {label: message('Sound'), key: 'sound', value: 'sound'},
        {label: message('Lighting'), key: 'lighting', value: 'lighting'},
        {label: message('Creator'), key: 'creator', value: 'creator'},
      ],
    },
  },
  {
    key: 'gender',
    label: message('Gender'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'male',
      options: [
        {
          label: message('Male'),
          key: 'male',
          value: 'male',
        },
        {
          label: message('Female'),
          key: 'female',
          value: 'female',
        },
      ],
    },
  },
  {
    key: 'poster',
    label: message('No poster'),
    description: message('Whether person has a poster'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: null,
    },
  },
  {
    key: 'views',
    label: message('Page views'),
    description: message('Number of unique page views'),
    defaultOperator: FilterOperator.lte,
    operators: ALL_NUMBER_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      minValue: 1,
      defaultValue: 100,
    },
  },
  timestampFilter({
    key: 'birth_date',
    label: message('Birth date'),
    description: message('Date person was born'),
  }),
  timestampFilter({
    key: 'death_date',
    label: message('Death date'),
    description: message('Date person died'),
  }),
  createdAtFilter({
    description: message('Date person was created'),
  }),
  updatedAtFilter({
    description: message('Date person was last updated'),
  }),
];
