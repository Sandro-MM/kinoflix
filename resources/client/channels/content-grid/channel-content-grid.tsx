import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import React, {Fragment} from 'react';
import {ChannelContentProps} from '@app/channels/channel-content';
import {useInfiniteChannelContent} from '@common/channels/requests/use-infinite-channel-content';
import {ChannelHeader} from '@app/channels/channel-header/channel-header';
import {
  ContentGridLayout,
  ContentGridProps,
} from '@app/channels/content-grid/content-grid-layout';
import {ChannelContentGridItem} from '@app/channels/content-grid/channel-content-grid-item';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {useChannelContent} from '@common/channels/requests/use-channel-content';
import clsx from 'clsx';
import {
  PaginationControls,
  PaginationControlsType,
} from '@common/ui/navigation/pagination-controls';

interface ChannelContentGridProps extends ChannelContentProps {
  variant?: ContentGridProps['variant'];
}
export function ChannelContentGrid(props: ChannelContentGridProps) {
  const isInfiniteScroll =
    !props.isNested &&
    (!props.channel.config.paginationType ||
      props.channel.config.paginationType === 'infiniteScroll');
  return (
    <Fragment>
      <ChannelHeader {...props} />
      {isInfiniteScroll ? (
        <InfiniteScrollGrid {...props} />
      ) : (
        <PaginatedGrid {...props} />
      )}
    </Fragment>
  );
}

function InfiniteScrollGrid({channel, variant}: ChannelContentGridProps) {
  const query = useInfiniteChannelContent<ChannelContentModel>(channel);
  return (
    <div
      className={clsx('transition-opacity', query.isReloading && 'opacity-70')}
    >
      <ContentGrid content={query.items} variant={variant} />
      <InfiniteScrollSentinel query={query} />
    </div>
  );
}

function PaginatedGrid({channel, variant, isNested}: ChannelContentGridProps) {
  const query = useChannelContent(channel, null, {isNested});
  return (
    <div
      className={clsx(
        'transition-opacity',
        query.isPlaceholderData && 'opacity-70',
      )}
    >
      {!isNested && (
        <PaginationControls
          pagination={query.data}
          type={channel.config.paginationType as PaginationControlsType}
          className="mb-24"
        />
      )}
      <ContentGrid content={query.data?.data} variant={variant} />
      {!isNested && (
        <PaginationControls
          pagination={query.data}
          type={channel.config.paginationType as PaginationControlsType}
          className="mt-24"
          scrollToTop
        />
      )}
    </div>
  );
}

interface ContentProps {
  content: ChannelContentModel[] | undefined;
  variant: ContentGridProps['variant'];
}
export function ContentGrid({content = [], variant}: ContentProps) {
  return (
    <ContentGridLayout variant={variant}>
      {content.map(item => (
        <ChannelContentGridItem
          key={`${item.id}-${item.model_type}`}
          item={item}
          variant={variant}
        />
      ))}
    </ContentGridLayout>
  );
}
