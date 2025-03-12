import {Title} from '@app/titles/models/title';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {useRelatedTitles} from '@app/titles/requests/use-related-titles';
import {useCarousel} from '@app/channels/carousel/use-carousel';
import React, {Fragment} from 'react';
import {IconButton} from '@ui/buttons/icon-button';
import {KeyboardArrowLeftIcon} from '@ui/icons/material/KeyboardArrowLeft';
import {KeyboardArrowRightIcon} from '@ui/icons/material/KeyboardArrowRight';
import clsx from 'clsx';
import {TitlePortraitGridItem} from '@app/channels/content-grid/title-grid-item';

interface Props {
  title: Title;
}
export function RelatedTitlesPanel({title}: Props) {
  const {data} = useRelatedTitles(title.id);

  if (!data || data.titles.length === 0) {
    return null;
  }

  return <RelatedTitlesCarousel titles={data.titles} />;
}

interface RelatedTitlesCarouselProps {
  titles: Title[];
}
function RelatedTitlesCarousel({titles}: RelatedTitlesCarouselProps) {
  const {
    scrollContainerRef,
    canScrollForward,
    canScrollBackward,
    scrollToPreviousPage,
    scrollToNextPage,
    containerClassName,
    itemClassName,
  } = useCarousel();

  return (
    <div className="mt-48">
      <SiteSectionHeading
        actions={
          <Fragment>
            <IconButton
              disabled={!canScrollBackward}
              onClick={() => scrollToPreviousPage()}
              aria-label="Scroll left"
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              disabled={!canScrollForward}
              onClick={() => scrollToNextPage()}
              aria-label="Scroll right"
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Fragment>
        }
      >
        <Trans message="More like this" />
      </SiteSectionHeading>
      <div
        ref={scrollContainerRef}
        className={clsx(containerClassName, 'content-grid-portrait')}
      >
        {titles.map(item => (
          <div className={itemClassName} key={item.id}>
            <TitlePortraitGridItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
