import React, {useMemo} from 'react';
import {
  BaseMediaLink,
  BaseMediaLinkProps,
  getBaseMediaLink,
} from '@app/base-media-link';
import {Channel} from '@common/channels/channel';
import {Trans} from '@ui/i18n/trans';
import {useAuth} from '@common/auth/use-auth';

interface Props extends Omit<BaseMediaLinkProps, 'link'> {
  list: Channel;
}
export function UserListLink({list, children, ...linkProps}: Props) {
  const {user} = useAuth();
  const link = useMemo(() => {
    return getUserListLink(list);
  }, [list]);

  let content;

  if (children) {
    content = children;
  } else if (list.internal && list.name === 'watchlist') {
    if (list.user_id !== user?.id) {
      return <Trans message="Watchlist" />;
    } else {
      content = <Trans message="Watchlist" />;
    }
  } else {
    content = list.name;
  }

  return (
    <BaseMediaLink {...linkProps} link={link}>
      {content}
    </BaseMediaLink>
  );
}

interface Options {
  absolute?: boolean;
  season?: number | string;
  episode?: number | string;
}

export function getUserListLink(
  list: Channel,
  {absolute}: Options = {},
): string {
  if (list.name === 'watchlist') {
    return getBaseMediaLink('/watchlist', {
      absolute,
    });
  }
  return getBaseMediaLink(`/lists/${list.id}`, {
    absolute,
  });
}
