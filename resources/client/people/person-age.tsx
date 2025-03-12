import {Person} from '@app/titles/models/person';
import {FormattedDateTimeRange} from '@ui/i18n/formatted-date-time-range';
import {Fragment, memo} from 'react';

interface Props {
  person: Person;
  showRange?: boolean;
}
export const PersonAge = memo(({person, showRange}: Props) => {
  if (showRange && person.birth_date && person.death_date) {
    return (
      <FormattedDateTimeRange
        timezone="utc"
        start={person.birth_date}
        end={person.death_date}
        options={{year: 'numeric'}}
      />
    );
  }

  if (person.birth_date) {
    return (
      <Fragment>
        {calculateAgeFromBirthDate(person.birth_date, person.death_date)}
      </Fragment>
    );
  }

  return null;
});

function calculateAgeFromBirthDate(
  _birthDate: string,
  _deathDate?: string,
): number {
  const until = _deathDate ? new Date(_deathDate) : new Date();
  const birthDate = new Date(_birthDate);
  let age = until.getFullYear() - birthDate.getFullYear();
  const m = until.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && until.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
