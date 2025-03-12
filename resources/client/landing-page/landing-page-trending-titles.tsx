import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';
import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {Title} from '@app/titles/models/title';
import {useImageSrc} from '@app/images/use-image-src';
import {message} from '@ui/i18n/message';
import {useTrans} from '@ui/i18n/use-trans';
import clsx from 'clsx';
import {MovieIcon} from '@ui/icons/material/Movie';

export function LandingPageTrendingTitles() {
  const titles = getBootstrapData().loaders?.landingPage?.trendingTitles;
  if (!titles?.length) {
    return null;
  }

  return (
    <div className="landing-container mb-48 md:mb-80">
      <div className="mb-48 mt-14 h-1 bg-divider md:mb-80" />
      <h2 className="mb-34 text-center text-4xl">
        <Trans message="See what's currently trending." />
      </h2>
      <div className="grid grid-cols-3 gap-24">
        {titles.map(title => (
          <TitleItem key={title.id} title={title} />
        ))}
      </div>
    </div>
  );
}

interface TitleItemProps {
  title: Title;
}
function TitleItem({title}: TitleItemProps) {
  const src = useImageSrc(title?.backdrop, {size: 'lg'});
  const {trans} = useTrans();

  const imageClassName = clsx(
    'h-full w-full rounded bg-fg-base/4 object-cover',
    !src ? 'flex items-center justify-center' : 'block',
  );

  const image = src ? (
    <img
      className={imageClassName}
      draggable={false}
      loading="lazy"
      src={src}
      alt={trans(message('Poster for :name', {values: {name: title.name}}))}
    />
  ) : (
    <span className={imageClassName}>
      <MovieIcon className="max-w-[60%] text-divider" size="text-6xl" />
    </span>
  );

  return (
    <div>
      <div className="relative">{image}</div>
      <div className="mt-10 text-center text-base font-medium">
        {title.name}
      </div>
    </div>
  );
}
