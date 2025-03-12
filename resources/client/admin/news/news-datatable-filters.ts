import {BackendFilter} from '@common/datatable/filters/backend-filter';
import {message} from '@ui/i18n/message';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';

export const NewsDatatableFilters: BackendFilter[] = [
  createdAtFilter({
    description: message('Date article was created'),
  }),
  updatedAtFilter({
    description: message('Date article was last updated'),
  }),
];
