import React, {useMemo} from 'react';
import {Title} from '@app/titles/models/title';
import {getSeasonLink, SeasonLinkProps} from '@app/seasons/season-link';
import {Episode} from '@app/titles/models/episode';
import {BaseMediaLink} from '@app/base-media-link';

interface Props extends Omit<SeasonLinkProps, 'seasonNumber'> {
  episodeNumber?: number;
  seasonNumber?: number;
  episode?: Episode;
}
export function EpisodeLink({
  title,
  seasonNumber,
  episodeNumber,
  episode,
  children,
  color = 'inherit',
  ...linkProps
}: Props) {
  const link = useMemo(() => {
    return getEpisodeLink(
      title,
      seasonNumber || episode?.season_number || 1,
      episodeNumber || episode?.episode_number || 1,
    );
  }, [title, seasonNumber, episodeNumber, episode]);

  return (
    <BaseMediaLink {...linkProps} link={link}>
      {children ?? <span>{episode?.name}</span>}
    </BaseMediaLink>
  );
}

export function getEpisodeLink(
  title: Title,
  seasonNumber: number | string,
  episodeNumber: number | string,
  {absolute}: {absolute?: boolean} = {},
): string {
  const seasonLink = getSeasonLink(title, seasonNumber, {absolute});
  return `${seasonLink}/episode/${episodeNumber}`;
}
