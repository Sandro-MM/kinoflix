import {User} from '@ui/types/user';
import React, {useContext} from 'react';
import {SiteConfigContext} from '@common/core/settings/site-config-context';
import {UserAvatar} from '@common/auth/user-avatar';
import {Trans} from '@ui/i18n/trans';
import {Link} from 'react-router';

interface Props {
  user: User;
}
export function UserListByline({user}: Props) {
  const {auth} = useContext(SiteConfigContext);
  return (
    <div className="mr-24 flex flex-shrink-0 items-center gap-8">
      <UserAvatar user={user} circle size="sm" />
      <div>
        <Trans
          message="List by <a>:name</a>"
          values={{
            a: () => (
              <Link
                to={auth.getUserProfileLink!(user)}
                className="font-bold hover:underline"
              >
                {user.name}
              </Link>
            ),
          }}
        />
      </div>
    </div>
  );
}
