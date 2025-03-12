import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import clsx from 'clsx';
import {Title} from '@app/titles/models/title';
import {
  ImageSize,
  useImageSrc,
  useImageSrcSet,
} from '@app/images/use-image-src';
import {Episode} from '@app/titles/models/episode';
import {TitleLink} from '@app/titles/title-link';
import {EpisodeLink} from '@app/episodes/episode-link';
import {IconButton} from '@ui/buttons/icon-button';
import {Link} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {MovieIcon} from '@ui/icons/material/Movie';

// can provide either url for backdrop directly or
// title/episode object if main backdrop for it should be used
interface Props {
  src?: string;
  title?: Title;
  episode?: Episode;
  className?: string;
  size?: string;
  lazy?: boolean;
  srcSize?: ImageSize;
  wrapWithLink?: boolean;
  showPlayButton?: boolean;
  wrapperClassName?: string;
}
export function TitleBackdrop({
  src: initialSrc,
  title,
  episode,
  className,
  size,
  srcSize,
  lazy = true,
  wrapWithLink = false,
  showPlayButton,
  wrapperClassName,
}: Props) {
  const {trans} = useTrans();
  const primaryVideo = episode?.primary_video || title?.primary_video;
  if (!primaryVideo) {
    showPlayButton = false;
  }

  if (!initialSrc && episode) {
    initialSrc = episode?.poster;
  }
  if (!initialSrc && title) {
    initialSrc = title.backdrop;
  }

  const src = useImageSrc(initialSrc, {size: srcSize});
  const item = episode || title;
  const srcset = useImageSrcSet(initialSrc);

  const imageClassName = clsx(
    className,
    size,
    'aspect-video bg-fg-base/4 object-cover',
    !src ? 'flex items-center justify-center' : 'block',
  );

  let img = src ? (
    <img
      className={imageClassName}
      draggable={false}
      decoding="async"
      sizes={!srcSize ? `100vw` : undefined}
      loading={lazy ? 'lazy' : 'eager'}
      src={src}
      srcSet={!srcSize ? srcset : undefined}
      alt={
        item
          ? trans(
              message('Backdrop for :name', {
                values: {name: item.name},
              }),
            )
          : ''
      }
    />
  ) : (
    <span className={imageClassName}>
      <MovieIcon className="max-w-[60%] text-divider" size="text-6xl" />
    </span>
  );

  const playButton = showPlayButton ? (
    <div className="absolute bottom-14 left-14">
      <IconButton
        color="white"
        variant="flat"
        className="shadow-md"
        radius="rounded-full"
        elementType={Link}
        to={getWatchLink(primaryVideo!)}
        aria-label="Play"
      >
        <MediaPlayIcon />
      </IconButton>
    </div>
  ) : null;

  if (wrapWithLink) {
    if (episode) {
      img = (
        <EpisodeLink
          episode={episode}
          title={title!}
          seasonNumber={episode.season_number}
          displayContents
        >
          {img}
        </EpisodeLink>
      );
    } else if (title) {
      img = (
        <TitleLink title={title} displayContents>
          {img}
        </TitleLink>
      );
    }
  }

  return (
    <div className={clsx('group relative flex-shrink-0', wrapperClassName)}>
      {img}
      {playButton}
      {wrapWithLink && (
        <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
      )}
    </div>
  );
}
