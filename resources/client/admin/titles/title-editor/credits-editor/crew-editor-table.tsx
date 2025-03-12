import {ColumnConfig} from '@common/datatable/column-config';
import {TitleCredit} from '@app/titles/models/title';
import {Trans} from '@ui/i18n/trans';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import React, {Fragment, useContext} from 'react';
import {Table, TableBodyProps} from '@common/ui/tables/table';
import {TableRow} from '@common/ui/tables/table-row';
import {TableContext} from '@common/ui/tables/table-context';
import {getCreditsEditorActionColumn} from '@app/admin/titles/title-editor/credits-editor/get-credits-editor-action-column';
import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';
import {CreditsTableQueryIndicator} from '@app/admin/titles/title-editor/credits-editor/credits-table-query-indicator';

const columnConfig: ColumnConfig<TitleCredit>[] = [
  {
    key: 'name',
    header: () => <Trans message="Person" />,
    visibleInMode: 'all',
    body: credit => (
      <div className="flex items-center gap-12">
        <PersonPoster rounded person={credit} size="w-44" />
        <div className="min-w-0 overflow-hidden">{credit.name}</div>
      </div>
    ),
  },
  {
    key: 'department',
    header: () => <Trans message="Department" />,
    body: credit => credit.pivot.department,
  },
  {
    key: 'job',
    header: () => <Trans message="Job" />,
    body: credit => credit.pivot.job,
  },
  getCreditsEditorActionColumn(),
];

interface Props {
  query: UseInfiniteDataResult<TitleCredit>;
}
export function CrewEditorTable({query}: Props) {
  return (
    <Fragment>
      <Table
        enableSelection={false}
        columns={columnConfig}
        data={query.items}
        cellHeight="h-54"
        tableBody={<CreditsTableBody />}
      />
      <CreditsTableQueryIndicator query={query} />
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
