import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@ui/i18n/trans';
import React, {Fragment} from 'react';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@ui/buttons/icon-button';
import {TitleTag} from '@app/admin/titles/requests/use-detach-title-tag';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {EditIcon} from '@ui/icons/material/Edit';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import softwareEngineerSvg from '@common/admin/tags/software-engineer.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import {CreateTitleTagDialog} from '@app/admin/title-tags/title-tags-editor/create-title-tag-dialog';
import {UpdateTitleTagDialog} from '@app/admin/title-tags/title-tags-editor/update-title-tag-dialog';
import {TitleTagsDatatableFilters} from '@app/admin/title-tags/title-tags-editor/title-tags-datatable-filters';

const columnConfig: ColumnConfig<TitleTag>[] = [
  {
    key: 'name',
    allowsSorting: true,
    visibleInMode: 'all',
    width: 'flex-3 min-w-200',
    header: () => <Trans message="Name" />,
    body: tag => tag.name,
  },
  {
    key: 'display_name',
    allowsSorting: true,
    header: () => <Trans message="Display name" />,
    body: tag => tag.display_name,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: tag => <FormattedDate date={tag.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-42 flex-shrink-0',
    visibleInMode: 'all',
    body: tag => (
      <DialogTrigger type="modal">
        <IconButton size="md" className="text-muted">
          <EditIcon />
        </IconButton>
        <UpdateTitleTagDialog tag={tag} />
      </DialogTrigger>
    ),
  },
];

interface Props {
  type: TitleTag['model_type'];
}
export function TitleTagsDatatablePage({type}: Props) {
  const displayType = `${type.replace('_', ' ')}s`;
  return (
    <DataTablePage
      endpoint={`title-tags/${type}`}
      title={<Trans message={displayType} />}
      columns={columnConfig}
      filters={TitleTagsDatatableFilters}
      actions={<Actions type={type} />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={softwareEngineerSvg}
          title={
            <Trans
              message="No :name have been created yet"
              values={{name: displayType}}
            />
          }
          filteringTitle={
            <Trans message="No matching :name" values={{name: displayType}} />
          }
        />
      }
    />
  );
}

interface ActionsProps {
  type: TitleTag['model_type'];
}
function Actions({type}: ActionsProps) {
  return (
    <Fragment>
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans
            message="Add new :name"
            values={{name: type.replace('_', ' ')}}
          />
        </DataTableAddItemButton>
        <CreateTitleTagDialog type={type} />
      </DialogTrigger>
    </Fragment>
  );
}

export function TitleKeywordsDatatablePage() {
  return <TitleTagsDatatablePage type="keyword" />;
}

export function TitleGenresDatatablePage() {
  return <TitleTagsDatatablePage type="genre" />;
}
