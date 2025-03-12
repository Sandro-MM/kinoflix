import React, {useMemo} from 'react';
import {Title} from '@app/titles/models/title';
import {getTitleLink} from '@app/titles/title-link';
import {Trans} from '@ui/i18n/trans';
import {BaseMediaLink, BaseMediaLinkProps} from '@app/base-media-link';

export interface SeasonLinkProps extends Omit<BaseMediaLinkProps, 'link'> {
  title: Title;
  seasonNumber: number;
}
export function SeasonLink({
  title,
  seasonNumber,
  children,
  color = 'inherit',
  ...linkProps
}: SeasonLinkProps) {
  const link = useMemo(() => {
    return getSeasonLink(title, seasonNumber);
  }, [title, seasonNumber]);

  return (
    <BaseMediaLink {...linkProps} link={link}>
      {children ?? (
        <Trans message="Season :number" values={{number: seasonNumber}} />
      )}
    </BaseMediaLink>
  );
}

export function getSeasonLink(
  title: Title,
  seasonNumber: number | string,
  {absolute}: {absolute?: boolean} = {},
): string {
  const titleLink = getTitleLink(title, {absolute});
  return `${titleLink}/season/${seasonNumber}`;
}
