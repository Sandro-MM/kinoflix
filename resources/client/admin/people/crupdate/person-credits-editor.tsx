import {ColumnConfig} from '@common/datatable/column-config';
import {PersonCredit, TitleCredit} from '@app/titles/models/title';
import {Trans} from '@ui/i18n/trans';
import React, {Fragment, useContext, useMemo} from 'react';
import {Table, TableBodyProps} from '@common/ui/tables/table';
import {TableRow} from '@common/ui/tables/table-row';
import {TableContext} from '@common/ui/tables/table-context';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@ui/buttons/icon-button';
import {DeleteIcon} from '@ui/icons/material/Delete';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import {useOutletContext} from 'react-router';
import {GetPersonResponse} from '@app/people/requests/use-person';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {RecentActorsIcon} from '@ui/icons/material/RecentActors';
import {TitleLink} from '@app/titles/title-link';
import {useDeletePersonCredit} from '@app/admin/people/requests/use-delete-person-credit';

const columnConfig: ColumnConfig<PersonCredit>[] = [
  {
    key: 'name',
    header: () => <Trans message="Credit" />,
    visibleInMode: 'all',
    width: 'flex-3',
    body: credit => (
      <div className="flex items-center gap-12">
        <TitlePoster title={credit} srcSize="sm" size="w-32" />
        <div className="min-w-0 overflow-hidden">
          <div className="overflow-hidden overflow-ellipsis">
            <TitleLink title={credit} target="_blank" />
          </div>
          <div className="overflow-hidden overflow-ellipsis text-xs text-muted">
            {credit.is_series ? (
              <Trans message="Series" />
            ) : (
              <Trans message="Movie" />
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'year',
    header: () => <Trans message="Year" />,
    body: credit => credit.year,
  },
  {
    key: 'character',
    header: () => <Trans message="Character" />,
    body: credit => (credit.pivot.character ? credit.pivot.character : '-'),
  },
  {
    key: 'department',
    header: () => <Trans message="Department" />,
    body: credit => (
      <span className="capitalize">{credit.pivot.department}</span>
    ),
  },
  {
    key: 'job',
    header: () => <Trans message="Job" />,
    body: credit => <span className="capitalize">{credit.pivot.job}</span>,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-42 flex-shrink-0',
    visibleInMode: 'all',
    body: item => (
      <div className="text-muted">
        <DeleteButton credit={item} />
      </div>
    ),
  },
];

export function PersonCreditsEditor() {
  const data = useOutletContext<GetPersonResponse>();
  const credits = useMemo(() => {
    return Object.values(data.credits)
      .flat()
      .filter(credit => credit.pivot != null);
  }, [data.credits]);
  return (
    <Fragment>
      <Table
        enableSelection={false}
        columns={columnConfig}
        data={credits}
        cellHeight="h-54"
        tableBody={<CreditsTableBody />}
      />
      {!credits.length && <NoCreditsMessage />}
    </Fragment>
  );
}

function CreditsTableBody({renderRowAs}: TableBodyProps) {
  const {data} = useContext(TableContext);
  return (
    <Fragment>
      {data.map((item, rowIndex) => (
        <TableRow
          item={item}
          index={rowIndex}
          // use pivot id for key because some person might
          // appear multiple times with different department
          key={(item as TitleCredit).pivot.id}
          renderAs={renderRowAs}
        />
      ))}
    </Fragment>
  );
}

function NoCreditsMessage() {
  return (
    <IllustratedMessage
      className="mt-40"
      imageMargin="mb-8"
      image={
        <div className="text-muted">
          <RecentActorsIcon size="xl" />
        </div>
      }
      imageHeight="h-auto"
      title={<Trans message="No credits have been added yet" />}
    />
  );
}

interface DeleteButtonProps {
  credit: PersonCredit;
}
function DeleteButton({credit}: DeleteButtonProps) {
  const deleteCredit = useDeletePersonCredit(credit);
  return (
    <DialogTrigger type="modal">
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        isDanger
        title={<Trans message="Delete credit" />}
        body={<Trans message="Are you sure you want to delete this credit?" />}
        confirm={<Trans message="Delete" />}
        isLoading={deleteCredit.isPending}
        onConfirm={() => deleteCredit.mutate()}
      />
    </DialogTrigger>
  );
}
