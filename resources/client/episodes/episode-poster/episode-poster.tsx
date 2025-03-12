import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import clsx from 'clsx';
import {ImageSize, useImageSrc} from '@app/images/use-image-src';
import {Episode} from '@app/titles/models/episode';
import {EpisodeLink} from '@app/episodes/episode-link';
import {Title} from '@app/titles/models/title';
import {ReactNode} from 'react';
import {Link} from 'react-router';
import {IconButton} from '@ui/buttons/icon-button';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {MovieIcon} from '@ui/icons/material/Movie';

interface Props {
  title: Title;
  episode: Episode;
  seasonNumber?: number;
  className?: string;
  size?: string;
  lazy?: boolean;
  srcSize?: ImageSize;
  children?: ReactNode;
  aspect?: string;
  link?: string;
  wrapWithLink?: boolean;
  showPlayButton?: boolean;
  rightAction?: ReactNode;
}
export function EpisodePoster({
  episode,
  title,
  seasonNumber,
  className,
  size,
  srcSize,
  lazy = true,
  children,
  aspect = 'aspect-video',
  link,
  wrapWithLink = true,
  showPlayButton,
  rightAction,
}: Props) {
  const {trans} = useTrans();
  const src = useImageSrc(episode.poster, {size: srcSize});

  const imageClassName = clsx(
    'w-full h-full object-cover bg-fg-base/4',
    !src ? 'flex items-center justify-center' : 'block',
  );

  let image = src ? (
    <img
      className={imageClassName}
      draggable={false}
      loading={lazy ? 'lazy' : 'eager'}
      src={src}
      alt={trans(message('Poster for :name', {values: {name: episode.name}}))}
    />
  ) : (
    <span className={imageClassName}>
      <MovieIcon className="max-w-[60%] text-divider" size="text-6xl" />
    </span>
  );

  const playButton =
    showPlayButton && episode.primary_video ? (
      <IconButton
        color="white"
        variant="flat"
        className="absolute bottom-12 left-12 z-10 shadow-md"
        elementType={Link}
        radius="rounded-full"
        to={getWatchLink(episode.primary_video)}
      >
        <MediaPlayIcon />
      </IconButton>
    ) : null;

  if (wrapWithLink) {
    image = link ? (
      <Link to={link}>{image}</Link>
    ) : (
      <EpisodeLink
        title={title}
        episode={episode}
        seasonNumber={episode.season_number ?? seasonNumber}
        displayContents
      >
        {image}
      </EpisodeLink>
    );
  }

  return (
    <div
      className={clsx('group relative flex-shrink-0', size, aspect, className)}
    >
      {image}
      {playButton}
      {children && <div className="absolute bottom-14 left-14">{children}</div>}
      {wrapWithLink && (
        <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
      )}
      {rightAction && (
        <div className="absolute bottom-12 right-12 z-10 shadow-md">
          {rightAction}
        </div>
      )}
    </div>
  );
}
