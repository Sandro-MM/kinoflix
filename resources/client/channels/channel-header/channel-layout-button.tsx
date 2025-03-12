import {Channel} from '@common/channels/channel';
import {Trans} from '@ui/i18n/trans';
import {Menu, MenuItem, MenuTrigger} from '@ui/menu/menu-trigger';
import {useChannelLayouts} from '@app/channels/channel-header/use-channel-layouts';
import {Button} from '@ui/buttons/button';
import {IconButton} from '@ui/buttons/icon-button';
import {GridViewIcon} from '@ui/icons/material/GridView';

interface Props {
  channel: Channel;
}
export function ChannelLayoutButton({channel}: Props) {
  const {selectedLayout, setSelectedLayout, availableLayouts} =
    useChannelLayouts(channel);

  if (availableLayouts?.length < 2) {
    return null;
  }

  const layoutConfig = availableLayouts?.find(
    method => method.key === selectedLayout,
  );

  return (
    <MenuTrigger
      selectionMode="single"
      showCheckmark
      selectedValue={selectedLayout}
      onSelectionChange={newValue => setSelectedLayout(newValue as string)}
    >
      <span role="button" aria-label="Toggle menu">
        <IconButton className="md:hidden" role="presentation">
          {layoutConfig?.icon || <GridViewIcon />}
        </IconButton>
        <Button
          role="presentation"
          className="max-md:hidden"
          startIcon={layoutConfig?.icon || <GridViewIcon />}
        >
          {layoutConfig?.label ? (
            <Trans {...layoutConfig.label} />
          ) : (
            <Trans message="Popularity" />
          )}
        </Button>
      </span>
      <Menu>
        {availableLayouts?.map(method => (
          <MenuItem key={method.key} value={method.key}>
            <Trans {...method.label} />
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
