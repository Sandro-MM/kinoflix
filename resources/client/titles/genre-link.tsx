import React, {useMemo} from 'react';
import {Genre} from '@app/titles/models/genre';
import {
  BaseMediaLink,
  BaseMediaLinkProps,
  getBaseMediaLink,
} from '@app/base-media-link';
import {Trans} from '@ui/i18n/trans';

interface Props extends Omit<BaseMediaLinkProps, 'link'> {
  genre: Genre;
}
export function GenreLink({genre, children, ...otherProps}: Props) {
  const link = useMemo(() => getGenreLink(genre), [genre]);
  return (
    <BaseMediaLink {...otherProps} link={link}>
      {children ?? <Trans message={genre.display_name || genre.name} />}
    </BaseMediaLink>
  );
}

export function getGenreLink(
  genre: Genre,
  {absolute}: {absolute?: boolean} = {},
): string {
  return getBaseMediaLink(`/genre/${genre.name}`, {absolute});
}
