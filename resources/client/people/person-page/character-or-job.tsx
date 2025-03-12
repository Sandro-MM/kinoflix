import {EpisodeCredit, PersonCredit} from '@app/titles/models/title';
import {Trans} from '@ui/i18n/trans';

interface Props {
  credit: PersonCredit | EpisodeCredit;
  className?: string;
}
export function CharacterOrJob({credit, className}: Props) {
  return (
    <div className={className}>
      {credit.pivot?.department === 'actors' ? (
        credit.pivot?.character ?? <Trans message="Unknown" />
      ) : (
        <span className="capitalize">
          {credit.pivot?.job ? (
            <Trans message={credit.pivot?.job} />
          ) : (
            <Trans message="Unknown" />
          )}
        </span>
      )}
    </div>
  );
}
