import React, {Fragment} from 'react';
import {Channel, CHANNEL_MODEL} from '@common/channels/channel';
import {ChannelContentGrid} from '@app/channels/content-grid/channel-content-grid';
import {ChannelHeader} from '@app/channels/channel-header/channel-header';
import {
  ChannelContentModel,
  Layout,
} from '@app/admin/channels/channel-content-config';
import {ChannelContentCarousel} from '@app/channels/carousel/channel-content-carousel';
import {ChannelContentSlider} from '@app/channels/channel-content-slider';
import {ChannelContentNews} from '@app/channels/channel-content-news';
import {ChannelContentList} from '@app/channels/channel-content-list';
import {Title} from '@app/titles/models/title';
import {NewsArticle} from '@app/titles/models/news-article';
import {useChannelLayouts} from '@app/channels/channel-header/use-channel-layouts';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {Trans} from '@ui/i18n/trans';
import todoImage from '@app/admin/lists/todo.svg';
import {SvgImage} from '@ui/images/svg-image';

export interface ChannelContentProps<
  T extends ChannelContentModel = ChannelContentModel,
> {
  channel: Channel<T>;
  isNested: boolean;
}
export function ChannelContent(props: ChannelContentProps) {
  // only show no results message in non nested channels
  if (props.isNested && !props.channel.content?.data.length) {
    return null;
  }
  if (props.channel.config.contentModel === CHANNEL_MODEL) {
    return <NestedChannels {...(props as ChannelContentProps<Channel>)} />;
  } else {
    return (
      <Fragment>
        <ChannelLayout {...props} />
        <NoResultsMessage channel={props.channel} />
      </Fragment>
    );
  }
}

interface NestedChannelsProps {
  channel: ChannelContentProps['channel'];
}
function NoResultsMessage({channel}: NestedChannelsProps) {
  if (channel.content?.data.length === 0) {
    return (
      <IllustratedMessage
        className="mt-60"
        image={<SvgImage src={todoImage} />}
        title={
          channel.type === 'list' ? (
            <Trans message="This list does not have any content yet." />
          ) : (
            <Trans message="This channel does not have any content yet." />
          )
        }
      />
    );
  }
  return null;
}

export function ChannelLayout(props: ChannelContentProps) {
  const {channel, isNested} = props;
  const {selectedLayout} = useChannelLayouts(channel);
  const layout = (
    isNested ? channel.config.nestedLayout : selectedLayout
  ) as Layout;

  switch (layout) {
    case 'grid':
      return <ChannelContentGrid {...props} variant="portrait" />;
    case 'landscapeGrid':
      return <ChannelContentGrid {...props} variant="landscape" />;
    case 'list':
      return <ChannelContentList {...props} />;
    case 'carousel':
      return <ChannelContentCarousel {...props} variant="portrait" />;
    case 'landscapeCarousel':
      return <ChannelContentCarousel {...props} variant="landscape" />;
    case 'slider':
      return (
        <ChannelContentSlider {...(props as ChannelContentProps<Title>)} />
      );
    case 'news':
      return (
        <ChannelContentNews {...(props as ChannelContentProps<NewsArticle>)} />
      );
    default:
      return null;
  }
}

function NestedChannels({channel, isNested}: ChannelContentProps) {
  return (
    <Fragment>
      <ChannelHeader channel={channel} isNested={isNested} />
      {channel.content?.data.map(nestedChannel => (
        <div key={nestedChannel.id} className="mb-40 md:mb-50">
          <ChannelContent
            channel={nestedChannel as Channel<Channel>}
            isNested
          />
        </div>
      ))}
    </Fragment>
  );
}
