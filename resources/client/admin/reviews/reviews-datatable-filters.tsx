import {
  ALL_NUMBER_OPERATORS,
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@ui/i18n/message';
import {USER_MODEL} from '@ui/types/user';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {TITLE_MODEL} from '@app/titles/models/title';

export const ReviewsDatatableFilters: BackendFilter[] = [
  {
    key: 'user_id',
    label: message('User'),
    description: message('User review was created by'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
  {
    key: 'reviewable_id',
    label: message('Title'),
    description: message('Movie or series review was created for'),
    defaultOperator: FilterOperator.eq,
    extraFilters: [
      {
        key: 'reviewable_type',
        operator: FilterOperator.eq,
        value: 'App\\Title',
      },
    ],
    control: {
      type: FilterControlType.SelectModel,
      model: TITLE_MODEL,
    },
  },
  {
    key: 'score',
    label: message('Score'),
    description: message('Review score'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_NUMBER_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      minValue: 1,
      maxValue: 10,
      defaultValue: 7,
    },
  },
  {
    key: 'helpful_count',
    label: message('Helpful count'),
    description: message('How many users found this review helpful'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_NUMBER_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      minValue: 1,
      defaultValue: 10,
    },
  },
  {
    key: 'not_helpful_count',
    label: message('Not helpful count'),
    description: message('How many users found this review not helpful'),
    defaultOperator: FilterOperator.gte,
    operators: ALL_NUMBER_OPERATORS,
    control: {
      type: FilterControlType.Input,
      inputType: 'number',
      minValue: 1,
      defaultValue: 10,
    },
  },
  createdAtFilter({
    description: message('Date review was created'),
  }),
  updatedAtFilter({
    description: message('Date review was last updated'),
  }),
];
