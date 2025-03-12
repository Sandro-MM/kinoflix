import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Link} from 'react-router';
import {IconButton} from '@ui/buttons/icon-button';
import {EditIcon} from '@ui/icons/material/Edit';
import React from 'react';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {CheckIcon} from '@ui/icons/material/Check';
import {CloseIcon} from '@ui/icons/material/Close';
import {Channel} from '@common/channels/channel';
import {FormattedNumber} from '@ui/i18n/formatted-number';

export const ListsDatatableColumns: ColumnConfig<Channel>[] = [
  {
    key: 'name',
    allowsSorting: true,
    width: 'flex-3',
    visibleInMode: 'all',
    header: () => <Trans message="Name" />,
    body: list => {
      return (
        <a
          className="outline-none hover:underline focus-visible:underline"
          href={`lists/${list.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {list.name}
        </a>
      );
    },
  },
  {
    key: 'user_id',
    allowsSorting: true,
    width: 'flex-2 min-w-140',
    header: () => <Trans message="Owner" />,
    body: list =>
      list.user && (
        <NameWithAvatar
          image={list.user.image}
          label={list.user.name}
          description={list.user.email}
        />
      ),
  },
  {
    key: 'items_count',
    width: 'w-96',
    header: () => <Trans message="Items" />,
    body: list =>
      list.items_count && <FormattedNumber value={list.items_count} />,
  },
  {
    key: 'public',
    header: () => <Trans message="Public" />,
    width: 'w-96',
    body: list =>
      list.public ? (
        <CheckIcon className="text-positive" />
      ) : (
        <CloseIcon className="text-danger" />
      ),
  },
  {
    key: 'content_type',
    allowsSorting: false,
    header: () => <Trans message="Content type" />,
    body: list => (
      <span className="capitalize">
        {list.config.contentModel ? (
          <Trans message={list.config.contentModel} />
        ) : undefined}
      </span>
    ),
  },
  {
    key: 'layout',
    allowsSorting: false,
    header: () => <Trans message="Layout" />,
    body: list => (
      <span className="capitalize">
        {list.config.layout ? (
          <Trans message={list.config.layout} />
        ) : undefined}
      </span>
    ),
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    maxWidth: 'max-w-100',
    header: () => <Trans message="Last updated" />,
    body: list =>
      list.updated_at ? <FormattedDate date={list.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    visibleInMode: 'all',
    align: 'end',
    width: 'w-42 flex-shrink-0',
    body: list => (
      <Link to={`${list.id}/edit`} className="text-muted">
        <IconButton size="md">
          <EditIcon />
        </IconButton>
      </Link>
    ),
  },
];
