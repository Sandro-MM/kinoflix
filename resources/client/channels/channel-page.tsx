import React from 'react';
import {PageStatus} from '@common/http/page-status';
import {useChannel} from '@common/channels/requests/use-channel';
import {ChannelContent} from '@app/channels/channel-content';
import {SitePageLayout} from '@app/site-page-layout';
import {Channel} from '@common/channels/channel';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {PageMetaTags} from '@common/http/page-meta-tags';

interface ChannelPageProps {
  slugOrId?: string | number;
  type?: 'list' | 'channel';
}
export function ChannelPage({slugOrId, type = 'channel'}: ChannelPageProps) {
  const query = useChannel(slugOrId, 'channelPage', {channelType: type});

  let content = null;

  if (query.data) {
    content = (
      <div>
        <PageMetaTags query={query} />
        <div className="pb-24">
          <div className="container mx-auto p-14 @container md:p-24">
            <ChannelContent
              channel={query.data.channel as Channel<ChannelContentModel>}
              // set key to force re-render when channel changes
              key={query.data.channel.id}
              isNested={false}
            />
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <PageStatus
        query={query}
        loaderClassName="absolute inset-0 m-auto"
        loaderIsScreen={false}
      />
    );
  }

  return <SitePageLayout>{content}</SitePageLayout>;
}

export function ListChannelPage() {
  return <ChannelPage type="list" />;
}
