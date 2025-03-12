import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Link} from 'react-router';
import {IconButton} from '@ui/buttons/icon-button';
import {EditIcon} from '@ui/icons/material/Edit';
import React from 'react';
import {FormattedNumber} from '@ui/i18n/formatted-number';
import {Tooltip} from '@ui/tooltip/tooltip';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import {Person} from '@app/titles/models/person';
import {PersonLink} from '@app/people/person-link';
import {KnownForCompact} from '@app/people/known-for-compact';

export const PeopleDatatableColumns: ColumnConfig<Person>[] = [
  {
    key: 'name',
    allowsSorting: true,
    width: 'flex-3',
    visibleInMode: 'all',
    header: () => <Trans message="Person" />,
    body: person => (
      <div className="flex items-center gap-12">
        <PersonPoster person={person} srcSize="sm" size="w-32" rounded />
        <div className="min-w-0 overflow-hidden">
          <div className="overflow-hidden overflow-ellipsis">
            <PersonLink person={person} target="_blank" />
          </div>
          <div className="overflow-hidden overflow-ellipsis text-xs text-muted">
            <KnownForCompact
              person={person}
              linkTarget="_blank"
              linkColor="inherit"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'birth_date',
    allowsSorting: true,
    header: () => <Trans message="Birth date" />,
    body: person => <FormattedDate date={person.birth_date} timezone="utc" />,
  },
  {
    key: 'views',
    allowsSorting: true,
    header: () => <Trans message="Page views" />,
    body: person =>
      person.views ? <FormattedNumber value={person.views} /> : null,
    width: 'w-124 flex-shrink-0',
  },
  {
    key: 'popularity',
    allowsSorting: true,
    header: () => <Trans message="Popularity" />,
    body: person =>
      person.popularity ? <FormattedNumber value={person.popularity} /> : null,
    width: 'w-124 flex-shrink-0',
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-124 flex-shrink-0',
    header: () => <Trans message="Last updated" />,
    body: person =>
      person.updated_at ? <FormattedDate date={person.updated_at} /> : '',
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    visibleInMode: 'all',
    align: 'end',
    width: 'w-42 flex-shrink-0',
    body: video => (
      <Link to={`${video.id}/edit/primary-facts`} className="text-muted">
        <Tooltip label={<Trans message="Edit" />}>
          <IconButton size="md">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
    ),
  },
];
