import {Channel, ChannelContentItem} from '@common/channels/channel';
import {
  channelContentConfig,
  Sort,
} from '@app/admin/channels/channel-content-config';
import {Button} from '@ui/buttons/button';
import {SortIcon} from '@ui/icons/material/Sort';
import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {useSearchParams} from 'react-router';
import {Menu, MenuItem, MenuTrigger} from '@ui/menu/menu-trigger';
import {message} from '@ui/i18n/message';
import {IconButton} from '@ui/buttons/icon-button';

interface ChannelSortButtonProps<T = ChannelContentItem> {
  channel: Channel;
}
export function ChannelSortButton<T = ChannelContentItem>({
  channel,
}: ChannelSortButtonProps<T>) {
  const config = channelContentConfig.models[channel.config.contentModel];
  const sortMethods =
    config?.sortMethods.map(method => ({
      key: method,
      label: channelContentConfig.sortingMethods[method].label,
    })) || [];

  if (channel.config.contentType === 'manual') {
    sortMethods.unshift({
      key: Sort.curated,
      label: message('Default order'),
    });
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue =
    searchParams.get('order') || channel.config.contentOrder;

  if (sortMethods?.length < 2) {
    return null;
  }

  const label = sortMethods?.find(
    method => method.key === selectedValue,
  )?.label;

  return (
    <MenuTrigger
      selectionMode="single"
      showCheckmark
      selectedValue={selectedValue}
      onSelectionChange={newValue => {
        // order by date added to channel, if content is cured
        if (
          newValue === Sort.recent &&
          channel.config.contentType === 'manual'
        ) {
          newValue = 'channelables.created_at:desc';
        }

        setSearchParams(
          prev => {
            prev.set('order', newValue as string);
            return prev;
          },
          {
            replace: true,
          },
        );
      }}
    >
      <span role="button" aria-label="Toggle menu">
        <IconButton className="md:hidden" role="presentation">
          <SortIcon />
        </IconButton>
        <Button
          startIcon={<SortIcon />}
          className="max-md:hidden"
          role="presentation"
        >
          {label ? <Trans {...label} /> : <Trans message="Popularity" />}
        </Button>
      </span>
      <Menu>
        {sortMethods?.map(method => (
          <MenuItem key={method.key} value={method.key}>
            <Trans {...method.label} />
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
