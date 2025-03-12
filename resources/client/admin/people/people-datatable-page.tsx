import React, {Fragment} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@ui/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import awardsImage from './awards.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Link} from 'react-router';
import {useSettings} from '@ui/settings/use-settings';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {Tooltip} from '@ui/tooltip/tooltip';
import {IconButton} from '@ui/buttons/icon-button';
import {PublishIcon} from '@ui/icons/material/Publish';
import {ImportSingleFromTmdbDialog} from '@app/admin/titles/import/import-single-from-tmdb-dialog';
import {PeopleDatatableColumns} from '@app/admin/people/people-datatable-columns';
import {PeopleDatatableFilters} from '@app/admin/people/people-datatable-filters';
import {PERSON_MODEL} from '@app/titles/models/person';

export function PeopleDatatablePage() {
  return (
    <DataTablePage
      endpoint="people"
      title={<Trans message="People" />}
      columns={PeopleDatatableColumns}
      filters={PeopleDatatableFilters}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={awardsImage}
          title={<Trans message="No people have been created yet" />}
          filteringTitle={<Trans message="No matching people" />}
        />
      }
    />
  );
}

function Actions() {
  const {tmdb_is_setup} = useSettings();
  const navigate = useNavigate();
  return (
    <Fragment>
      {tmdb_is_setup && (
        <DialogTrigger
          type="modal"
          onClose={item => {
            if (item) {
              navigate(`/admin/people/${item.id}/edit/primary-facts`);
            }
          }}
        >
          <Tooltip label={<Trans message="Import using TheMovieDB ID" />}>
            <IconButton
              variant="outline"
              color="primary"
              className="flex-shrink-0"
              size="sm"
            >
              <PublishIcon />
            </IconButton>
          </Tooltip>
          <ImportSingleFromTmdbDialog modelType={PERSON_MODEL} />
        </DialogTrigger>
      )}
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="Add person" />
      </DataTableAddItemButton>
    </Fragment>
  );
}
