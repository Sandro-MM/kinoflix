import React from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@ui/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import todoImage from './todo.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Link} from 'react-router';
import {ListsDatatableColumns} from '@app/admin/lists/lists-datatable-columns';

export function ListsDatatablePage() {
  return (
    <DataTablePage
      endpoint="lists"
      title={<Trans message="User lists" />}
      columns={ListsDatatableColumns}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={todoImage}
          title={<Trans message="No lists have been created yet" />}
          filteringTitle={<Trans message="No matching lists" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <DataTableAddItemButton elementType={Link} to="new">
      <Trans message="Add new list" />
    </DataTableAddItemButton>
  );
}
