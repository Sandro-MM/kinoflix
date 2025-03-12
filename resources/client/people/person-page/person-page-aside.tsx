import {
  DetailItem,
  TitlePageAsideLayout,
} from '@app/titles/pages/title-page/title-page-aside-layout';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';
import React from 'react';
import {PersonAge} from '@app/people/person-age';
import {GetPersonResponse} from '@app/people/requests/use-person';
import {ShareMenuTrigger} from '@app/sharing/share-menu-trigger';
import {Button} from '@ui/buttons/button';
import {ShareIcon} from '@ui/icons/material/Share';
import {Person} from '@app/titles/models/person';
import {getPersonLink} from '@app/people/person-link';
import {IconButton} from '@ui/buttons/icon-button';
import {Link} from 'react-router';
import {EditIcon} from '@ui/icons/material/Edit';
import {useAuth} from '@common/auth/use-auth';

interface Props {
  data: GetPersonResponse;
}
export function PersonPageAside({data: {person, total_credits_count}}: Props) {
  const {hasPermission} = useAuth();
  const age = (
    <Trans
      message=":count years old"
      values={{count: <PersonAge person={person} />}}
    />
  );

  return (
    <TitlePageAsideLayout
      className="max-md:flex"
      poster={
        <div>
          <div className="relative">
            <PersonPoster person={person} size="w-140 md:w-full" srcSize="lg" />
            {hasPermission('titles.update') && (
              <IconButton
                elementType={Link}
                to={`/admin/people/${person.id}/edit`}
                className="absolute bottom-6 right-4"
                color="white"
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
          <ShareButton person={person} />
        </div>
      }
    >
      <dl className="mt-12 md:mt-24">
        {person.known_for && (
          <DetailItem label={<Trans message="Known for" />}>
            <Trans message={person.known_for} />
          </DetailItem>
        )}
        {person.gender && (
          <DetailItem label={<Trans message="Gender" />}>
            <span className="capitalize">
              <Trans message={person.gender} />
            </span>
          </DetailItem>
        )}
        {total_credits_count ? (
          <DetailItem label={<Trans message="Known credits" />}>
            {total_credits_count}
          </DetailItem>
        ) : null}
        {person.birth_date ? (
          <DetailItem label={<Trans message="Born" />}>
            <FormattedDate date={person.birth_date} timezone="utc" />{' '}
            {!person.death_date && age ? <span>({age})</span> : null}
          </DetailItem>
        ) : null}
        {person.birth_place ? (
          <DetailItem label={<Trans message="Birthplace" />}>
            {person.birth_place}
          </DetailItem>
        ) : null}
        {person.death_date ? (
          <DetailItem label={<Trans message="Died" />}>
            <FormattedDate date={person.death_date} timezone="utc" /> ({age})
          </DetailItem>
        ) : null}
      </dl>
    </TitlePageAsideLayout>
  );
}

interface ShareButtonProps {
  person: Person;
}
function ShareButton({person}: ShareButtonProps) {
  const link = getPersonLink(person, {absolute: true});
  return (
    <ShareMenuTrigger link={link}>
      <Button
        variant="outline"
        color="primary"
        startIcon={<ShareIcon />}
        className="mt-14 md:min-h-40 md:w-full"
      >
        <Trans message="Share" />
      </Button>
    </ShareMenuTrigger>
  );
}
