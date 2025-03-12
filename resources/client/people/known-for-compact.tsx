import {Person} from '@app/titles/models/person';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {Trans} from '@ui/i18n/trans';
import {TitleLink} from '@app/titles/title-link';
import {HTMLAttributeAnchorTarget} from 'react';
import {BaseMediaLinkProps} from '@app/base-media-link';

interface Props {
  person: Person;
  linkTarget?: HTMLAttributeAnchorTarget;
  linkColor?: BaseMediaLinkProps['color'];
}
export function KnownForCompact({
  person,
  linkTarget,
  linkColor = 'primary',
}: Props) {
  return (
    <BulletSeparatedItems>
      {person.known_for ? <Trans message={person.known_for} /> : null}
      {person.primary_credit ? (
        <TitleLink
          target={linkTarget}
          color={linkColor}
          title={person.primary_credit}
          onClick={e => {
            e.stopPropagation();
          }}
        />
      ) : null}
    </BulletSeparatedItems>
  );
}
