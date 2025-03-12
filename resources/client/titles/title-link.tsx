import React, {useMemo} from 'react';
import {slugifyString} from '@ui/utils/string/slugify-string';
import {Title} from '@app/titles/models/title';
import {
  BaseMediaLink,
  BaseMediaLinkProps,
  getBaseMediaLink,
} from '@app/base-media-link';
import {getEpisodeLink} from '@app/episodes/episode-link';
import {getSeasonLink} from '@app/seasons/season-link';
import {Episode} from '@app/titles/models/episode';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';

interface Props extends Omit<BaseMediaLinkProps, 'link'> {
  title: Title;
}
export function TitleLink({title, children, ...linkProps}: Props) {
  const link = useMemo(() => {
    return getTitleLink(title);
  }, [title]);

  return (
    <BaseMediaLink {...linkProps} link={link}>
      {children ?? title.name}
    </BaseMediaLink>
  );
}

interface WithEpisodeProps extends Props {
  episode: Episode;
}
export function TitleLinkWithEpisodeNumber({
  title,
  episode,
  children,
  ...linkProps
}: WithEpisodeProps) {
  const link = useMemo(() => {
    return getEpisodeLink(title, episode.season_number, episode.episode_number);
  }, [title, episode]);

  return (
    <BaseMediaLink {...linkProps} link={link}>
      {title.name} (<CompactSeasonEpisode episode={episode} />)
    </BaseMediaLink>
  );
}

interface Options {
  absolute?: boolean;
  season?: number | string;
  episode?: number | string;
}

export function getTitleLink(
  title: Title,
  {absolute, season, episode}: Options = {},
): string {
  if (episode && season) {
    return getEpisodeLink(title, season, episode, {absolute});
  } else if (season) {
    return getSeasonLink(title, season, {absolute});
  }
  return getBaseMediaLink(`/titles/${title.id}/${slugifyString(title.name)}`, {
    absolute,
  });
}
