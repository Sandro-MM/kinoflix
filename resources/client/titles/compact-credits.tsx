import {memo, ReactNode} from 'react';
import {Trans} from '@ui/i18n/trans';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {PersonLink} from '@app/people/person-link';
import {GroupTitleCredits} from '@app/titles/requests/use-title';

interface Props {
  credits: GroupTitleCredits | undefined;
}
export const CompactCredits = memo(({credits = {}}: Props) => (
  <div className="mt-16 flex flex-col gap-14 border-t pt-16">
    {credits.creators?.length ? (
      <PeopleDetail label={<Trans message="Created by" />}>
        <BulletSeparatedItems className="hidden-scrollbar overflow-x-auto">
          {credits.creators.slice(0, 3).map(creator => (
            <PersonLink
              person={creator}
              key={creator.id}
              color="primary"
              className="whitespace-nowrap"
            />
          ))}
        </BulletSeparatedItems>
      </PeopleDetail>
    ) : null}
    {credits.directing?.length ? (
      <PeopleDetail
        label={
          <Trans
            message="[one Director|other Directors]"
            values={{count: credits.directing.length}}
          />
        }
      >
        <BulletSeparatedItems className="hidden-scrollbar overflow-x-auto">
          {credits.directing.slice(0, 3).map(director => (
            <PersonLink
              person={director}
              key={director.id}
              color="primary"
              className="whitespace-nowrap"
            />
          ))}
        </BulletSeparatedItems>
      </PeopleDetail>
    ) : null}
    {credits.writing?.length ? (
      <PeopleDetail
        label={
          <Trans
            message="[one Writer|other Writers]"
            values={{count: credits.writing.length}}
          />
        }
      >
        <BulletSeparatedItems className="hidden-scrollbar overflow-x-auto">
          {credits.writing.slice(0, 3).map(writer => (
            <PersonLink
              person={writer}
              key={writer.id}
              color="primary"
              className="whitespace-nowrap"
            />
          ))}
        </BulletSeparatedItems>
      </PeopleDetail>
    ) : null}
    {credits.actors?.length ? (
      <PeopleDetail label={<Trans message="Stars" />}>
        <BulletSeparatedItems className="hidden-scrollbar overflow-x-auto">
          {credits.actors.slice(0, 3).map(actor => (
            <PersonLink
              person={actor}
              key={actor.id}
              color="primary"
              className="whitespace-nowrap"
            />
          ))}
        </BulletSeparatedItems>
      </PeopleDetail>
    ) : null}
  </div>
));

interface PeopleDetailProps {
  label: ReactNode;
  children: ReactNode;
}
function PeopleDetail({label, children}: PeopleDetailProps) {
  return (
    <div className="flex-shrink-0 gap-24 md:flex">
      <div className="min-w-84 font-bold">{label}</div>
      <div>{children}</div>
    </div>
  );
}
