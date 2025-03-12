import {
  ALL_NUMBER_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@ui/i18n/message';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const TitlesDatatableFilters: BackendFilter[] = [
  {
    key: 'is_series',
    label: message('Type'),
    description: message('Whether title is a movie or a TV series'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: '02',
      options: [
        {
          key: '01',
          label: message('Both'),
          value: false,
        },
        {
          key: '02',
          label: message('Movie'),
          value: false,
        },
        {
          key: '03',
          label: message('TV series'),
          value: true,
        },
      ],
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
  {
    key: 'poster',
    label: message('No poster'),
    description: message('Whether title has a poster'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: null,
    },
  },
  createdAtFilter({
    description: message('Date title was created'),
  }),
  updatedAtFilter({
    description: message('Date title was last updated'),
  }),
];
