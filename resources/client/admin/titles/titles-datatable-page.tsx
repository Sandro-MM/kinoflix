import React, {Fragment, useMemo} from 'react';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {Trans} from '@ui/i18n/trans';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import movieNightImage from './movie-night.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {Link} from 'react-router';
import {TitlesDatatableColumns} from '@app/admin/titles/titles-datatable-columns';
import {useTitleIndexFilters} from '@app/titles/use-title-index-filters';
import {TitlesDatatableFilters} from '@app/admin/titles/titles-datatable-filters';
import {useSettings} from '@ui/settings/use-settings';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {Tooltip} from '@ui/tooltip/tooltip';
import {IconButton} from '@ui/buttons/icon-button';
import {PublishIcon} from '@ui/icons/material/Publish';
import {ImportSingleFromTmdbDialog} from '@app/admin/titles/import/import-single-from-tmdb-dialog';
import {TITLE_MODEL} from '@app/titles/models/title';
import {Menu, MenuItem, MenuTrigger} from '@ui/menu/menu-trigger';
import {openDialog} from '@ui/overlays/store/dialog-store';
import {ImportMultipleFromTmdbDialog} from '@app/admin/titles/import/import-multiple-from-tmdb-dialog';

export function TitlesDatatablePage() {
  const {filters, filtersLoading} = useTitleIndexFilters();

  const mergedFilters = useMemo(() => {
    return [...filters, ...TitlesDatatableFilters];
  }, [filters]);

  return (
    <DataTablePage
      endpoint="titles"
      title={<Trans message="Titles" />}
      columns={TitlesDatatableColumns}
      filters={mergedFilters}
      filtersLoading={filtersLoading}
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={movieNightImage}
          title={<Trans message="No titles have been created yet" />}
          filteringTitle={<Trans message="No matching titles" />}
        />
      }
    />
  );
}

function Actions() {
  const {tmdb_is_setup} = useSettings();

  return (
    <Fragment>
      {tmdb_is_setup && <ImportButton />}
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="Add title" />
      </DataTableAddItemButton>
    </Fragment>
  );
}

function ImportButton() {
  const navigate = useNavigate();
  return (
    <MenuTrigger>
      <Tooltip label={<Trans message="Import from TheMovieDB" />}>
        <IconButton
          variant="outline"
          color="primary"
          className="flex-shrink-0"
          size="sm"
        >
          <PublishIcon />
        </IconButton>
      </Tooltip>
      <Menu>
        <MenuItem
          value="single"
          onSelected={async () => {
            const title = await openDialog(ImportSingleFromTmdbDialog, {
              modelType: TITLE_MODEL,
            });
            if (title) {
              navigate(`/admin/titles/${title.id}/edit/primary-facts`);
            }
          }}
        >
          <Trans message="Import single title by ID" />
        </MenuItem>
        <MenuItem
          value="multiple"
          onSelected={() => {
            openDialog(ImportMultipleFromTmdbDialog);
          }}
        >
          <Trans message="Import multiple titles" />
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
