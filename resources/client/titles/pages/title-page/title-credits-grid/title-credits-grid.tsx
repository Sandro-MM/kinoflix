import {PersonPoster} from '@app/people/person-poster/person-poster';
import {PersonLink} from '@app/people/person-link';
import {TitleCredit} from '@app/titles/models/title';
import clsx from 'clsx';
import {Fragment} from 'react';
import {Trans} from '@ui/i18n/trans';

interface Props {
  credits: TitleCredit[];
  className?: string;
}
export function TitleCreditsGrid({credits, className}: Props) {
  if (!credits.length) {
    return (
      <div className="italic text-muted">
        <Trans message="We've no cast information for this title yet." />
      </div>
    );
  }

  return (
    <div
      className={clsx('title-credits-grid grid gap-14 md:gap-20', className)}
    >
      {credits.map(credit => (
        <div
          key={credit.pivot.id}
          className="flex items-center gap-14 md:gap-20"
        >
          <PersonPoster
            rounded
            person={credit}
            size="w-70 md:w-96"
            srcSize="md"
          />
          <div className="max-md:text-sm">
            <PersonLink className="block font-bold" person={credit} />
            <div className="text-muted">
              <Description credit={credit} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface DescriptionProps {
  credit: TitleCredit;
}
function Description({credit}: DescriptionProps) {
  if (credit.pivot.department === 'actors') {
    return <Fragment>{credit.pivot.character}</Fragment>;
  }
  return (
    <span className="capitalize">
      <Trans message={credit.pivot.job} />
    </span>
  );
}
