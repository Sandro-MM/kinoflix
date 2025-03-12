import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import React, {Fragment, ReactNode} from 'react';
import {ChannelContentProps} from '@app/channels/channel-content';
import {useInfiniteChannelContent} from '@common/channels/requests/use-infinite-channel-content';
import {ChannelHeader} from '@app/channels/channel-header/channel-header';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {ChannelContentListItem} from '@app/channels/channel-content-list-item';
import {useChannelContent} from '@common/channels/requests/use-channel-content';
import clsx from 'clsx';
import {
  PaginationControls,
  PaginationControlsType,
} from '@common/ui/navigation/pagination-controls';

export function ChannelContentList(props: ChannelContentProps) {
  const isInfiniteScroll =
    !props.isNested &&
    (!props.channel.config.paginationType ||
      props.channel.config.paginationType === 'infiniteScroll');
  return (
    <Fragment>
      <ChannelHeader {...props} />
      {isInfiniteScroll ? (
        <InfiniteScrollList {...props} />
      ) : (
        <PaginatedList {...props} />
      )}
    </Fragment>
  );
}

function InfiniteScrollList({channel}: ChannelContentProps) {
  const query = useInfiniteChannelContent<ChannelContentModel>(channel);
  return (
    <Content
      content={query.items}
      className={clsx('transition-opacity', query.isReloading && 'opacity-70')}
    >
      <InfiniteScrollSentinel query={query} />
    </Content>
  );
}

function PaginatedList({channel, isNested}: ChannelContentProps) {
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
      <Content content={query.data?.data} />
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
  children?: ReactNode;
  className?: string;
}
function Content({content = [], children, className}: ContentProps) {
  return (
    <div className={className}>
      {content.map(item => (
        <ChannelContentListItem
          key={`${item.id}-${item.model_type}`}
          item={item}
        />
      ))}
      {children}
    </div>
  );
}
