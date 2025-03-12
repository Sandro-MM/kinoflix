import React, {Fragment} from 'react';
import {ChannelContentProps} from '@app/channels/channel-content';
import {ChannelHeader} from '@app/channels/channel-header/channel-header';
import {ChannelContentGridItem} from '@app/channels/content-grid/channel-content-grid-item';
import {useCarousel} from '@app/channels/carousel/use-carousel';
import clsx from 'clsx';
import {ContentGridProps} from '@app/channels/content-grid/content-grid-layout';
import {IconButton} from '@ui/buttons/icon-button';
import {KeyboardArrowLeftIcon} from '@ui/icons/material/KeyboardArrowLeft';
import {KeyboardArrowRightIcon} from '@ui/icons/material/KeyboardArrowRight';

interface Props extends ChannelContentProps {
  variant?: ContentGridProps['variant'];
}
export function ChannelContentCarousel(props: Props) {
  const {channel, variant} = props;
  const {
    scrollContainerRef,
    canScrollForward,
    canScrollBackward,
    scrollToPreviousPage,
    scrollToNextPage,
    containerClassName,
    itemClassName,
  } = useCarousel();

  const gridClassName =
    variant === 'landscape'
      ? 'content-grid-landscape'
      : 'content-grid-portrait';

  return (
    <div>
      <ChannelHeader
        {...props}
        actions={
          <Fragment>
            <IconButton
              disabled={!canScrollBackward}
              onClick={() => scrollToPreviousPage()}
              aria-label="Previous page"
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
              disabled={!canScrollForward}
              onClick={() => scrollToNextPage()}
              aria-label="Next page"
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Fragment>
        }
      />
      <div
        ref={scrollContainerRef}
        className={clsx(containerClassName, gridClassName)}
      >
        {channel.content?.data.map(item => (
          <div className={itemClassName} key={`${item.id}-${item.model_type}`}>
            <ChannelContentGridItem item={item} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
}
