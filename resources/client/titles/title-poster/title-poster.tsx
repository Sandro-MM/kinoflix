import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import clsx from 'clsx';
import {Title} from '@app/titles/models/title';
import {TitleLink} from '@app/titles/title-link';
import {ImageSize, useImageSrc} from '@app/images/use-image-src';
import {Link} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {IconButton} from '@ui/buttons/icon-button';
import {Fragment} from 'react';
import {MovieIcon} from '@ui/icons/material/Movie';

interface Props {
  title: Title;
  className?: string;
  size?: string;
  lazy?: boolean;
  srcSize?: ImageSize;
  aspect?: string;
  showPlayButton?: boolean;
  link?: string;
}
export function TitlePoster({
  title,
  className,
  size = 'w-full',
  srcSize,
  lazy = true,
  aspect = 'aspect-poster',
  showPlayButton,
  link,
}: Props) {
  const {trans} = useTrans();
  const src = useImageSrc(title?.poster, {size: srcSize});
  if (!title.primary_video) {
    showPlayButton = false;
  }

  const imageClassName = clsx(
    'h-full w-full rounded bg-fg-base/4 object-cover',
    !src ? 'flex items-center justify-center' : 'block',
  );

  const image = src ? (
    <img
      className={imageClassName}
      decoding="async"
      draggable={false}
      loading={lazy ? 'lazy' : 'eager'}
      src={src}
      alt={trans(message('Poster for :name', {values: {name: title.name}}))}
    />
  ) : (
    <span className={clsx(imageClassName, 'overflow-hidden')}>
      <MovieIcon className="max-w-[60%] text-divider" size="text-6xl" />
    </span>
  );

  const linkChildren = (
    <Fragment>
      {image}
      <span className="pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10" />
    </Fragment>
  );

  return (
    <div
      className={clsx(size, aspect, className, 'group relative flex-shrink-0')}
    >
      {link ? (
        <Link to={link} className="contents">
          {linkChildren}
        </Link>
      ) : (
        <TitleLink title={title} displayContents>
          {linkChildren}
        </TitleLink>
      )}
      {showPlayButton ? (
        <div className="absolute bottom-14 left-14">
          <IconButton
            color="white"
            variant="flat"
            className="shadow-md"
            radius="rounded-full"
            elementType={Link}
            to={getWatchLink(title.primary_video)}
            aria-label={`Play ${title.name}`}
          >
            <MediaPlayIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
}
