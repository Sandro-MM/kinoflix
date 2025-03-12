import {Menu, MenuTrigger} from '@ui/menu/menu-trigger';
import {Item} from '@ui/forms/listbox/item';
import {Trans} from '@ui/i18n/trans';
import {FacebookIcon} from '@ui/icons/social/facebook';
import {TwitterIcon} from '@ui/icons/social/twitter';
import useClipboard from 'react-use-clipboard';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {useTrans} from '@ui/i18n/use-trans';
import {ReactElement} from 'react';
import {CopyLinkIcon} from '@app/sharing/copy-link-icon';
import {shareLinkSocially} from '@ui/utils/urls/share-link-socially';

interface Props {
  link: string;
  children: ReactElement;
}
export function ShareMenuTrigger({link, children}: Props) {
  const {trans} = useTrans();
  const [, setUrlCopied] = useClipboard(link);

  return (
    <MenuTrigger>
      {children}
      <Menu>
        <Item
          value="clipboard"
          startIcon={<CopyLinkIcon />}
          onSelected={() => {
            setUrlCopied();
            toast.positive(message('Copied link to clipboard'));
          }}
        >
          <Trans message="Copy to clipboard" />
        </Item>
        <Item
          value="facebook"
          startIcon={<FacebookIcon />}
          onClick={() => {
            shareLinkSocially(
              'facebook',
              link,
              trans(message('Check out this link')),
            );
          }}
        >
          <Trans message="Share to facebook" />
        </Item>
        <Item
          value="twitter"
          startIcon={<TwitterIcon />}
          onClick={() => {
            shareLinkSocially(
              'twitter',
              link,
              trans(message('Check out this link')),
            );
          }}
        >
          <Trans message="Share to twitter" />
        </Item>
      </Menu>
    </MenuTrigger>
  );
}
