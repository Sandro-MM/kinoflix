import {BackendFilter} from '@common/datatable/filters/backend-filter';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {message} from '@ui/i18n/message';

export const TitleTagsDatatableFilters: BackendFilter[] = [
  createdAtFilter({
    description: message('Date item was created'),
  }),
  updatedAtFilter({
    description: message('Date item was last updated'),
  }),
];
