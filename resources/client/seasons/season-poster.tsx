import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import clsx from 'clsx';
import {ImageSize, useImageSrc} from '@app/images/use-image-src';
import {Season} from '@app/titles/models/season';
import {SeasonLink} from '@app/seasons/season-link';
import {Title} from '@app/titles/models/title';
import {Link} from 'react-router';
import {MovieIcon} from '@ui/icons/material/Movie';

interface Props {
  title: Title;
  season: Season;
  className?: string;
  size?: string;
  lazy?: boolean;
  srcSize?: ImageSize;
  link?: string;
}
export function SeasonPoster({
  title,
  season,
  className,
  size = 'w-full',
  srcSize,
  lazy = true,
  link,
}: Props) {
  const {trans} = useTrans();
  const src = useImageSrc(season.poster || title.poster, {size: srcSize});

  const imageClassName = clsx(
    className,
    size,
    'object-cover bg-fg-base/4 aspect-poster rounded',
    !src ? 'flex items-center justify-center' : 'block',
  );

  const image = src ? (
    <img
      className={imageClassName}
      draggable={false}
      loading={lazy ? 'lazy' : 'eager'}
      src={src}
      alt={trans(
        message('Poster for season :number of :title', {
          values: {number: season.number, title: title.name},
        }),
      )}
    />
  ) : (
    <span className={imageClassName}>
      <MovieIcon className="max-w-[60%] text-divider" size="text-6xl" />
    </span>
  );

  return link ? (
    <Link to={link} className="flex-shrink-0">
      {image}
    </Link>
  ) : (
    <SeasonLink
      title={title}
      seasonNumber={season.number}
      className="flex-shrink-0"
    >
      {image}
    </SeasonLink>
  );
}
