import {Channel} from '@common/channels/channel';
import {channelContentConfig} from '@app/admin/channels/channel-content-config';
import {useCookie} from '@ui/utils/hooks/use-cookie';

export function useChannelLayouts(channel: Channel) {
  const config = channelContentConfig.models[channel.config.contentModel];
  const availableLayouts = config?.layoutMethods
    .filter(m => channelContentConfig.userSelectableLayouts.includes(m))
    .map(method => ({
      key: method,
      label: channelContentConfig.layoutMethods[method].label,
      icon: channelContentConfig.layoutMethods[method].icon,
    }));

  const [selectedLayout, setSelectedLayout] = useCookie(
    `channel-layout-${channel.config.contentModel}`,
    channel.config.selectedLayout || channel.config.layout,
  );

  return {selectedLayout, setSelectedLayout, availableLayouts};
}
