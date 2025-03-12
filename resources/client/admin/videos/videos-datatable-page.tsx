import React from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@ui/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import videoFilesImage from './video-files.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Link} from 'react-router';
import {VideosDatatableColumns} from '@app/admin/videos/videos-datatable-columns';
import {VideosDatatableFilters} from '@app/admin/videos/videos-datatable-filters';

export function VideosDatatablePage() {
  return (
    <DataTablePage
      endpoint="videos"
      queryParams={{
        withCount: 'plays,reports',
        with: 'episode',
      }}
      title={<Trans message="Videos" />}
      columns={VideosDatatableColumns}
      filters={VideosDatatableFilters}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={videoFilesImage}
          title={<Trans message="No videos have been created yet" />}
          filteringTitle={<Trans message="No matching videos" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <DataTableAddItemButton elementType={Link} to="new">
      <Trans message="Add video" />
    </DataTableAddItemButton>
  );
}
