import React from 'react';
import {ChannelPage} from '@app/channels/channel-page';
import {useSettings} from '@ui/settings/use-settings';

export function HomepageChannelPage() {
  const {homepage} = useSettings();
  let slugOrId = 'homepage';
  if (homepage?.type === 'channel' && homepage.value) {
    slugOrId = homepage.value;
  }
  return <ChannelPage slugOrId={slugOrId} />;
}
