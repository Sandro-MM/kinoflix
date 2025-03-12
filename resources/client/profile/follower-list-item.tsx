import {User} from '@ui/types/user';
import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {UserProfileLink} from '@common/users/user-profile-link';
import {UserAvatar} from '@common/auth/user-avatar';
import {FollowButton} from '@common/users/follow-button';

interface Props {
  follower: User;
}
export function FollowerListItem({follower}: Props) {
  return (
    <div
      key={follower.id}
      className="mb-16 flex items-center gap-16 border-b pb-16"
    >
      <UserAvatar user={follower} size="lg" />
      <div className="text-sm">
        <UserProfileLink user={follower} />
        {follower.followers_count && follower.followers_count > 0 ? (
          <div className="text-xs text-muted">
            <Trans
              message="[one 1 followers|other :count followers]"
              values={{count: follower.followers_count}}
            />
          </div>
        ) : null}
      </div>
      <FollowButton
        variant="outline"
        size="xs"
        className="ml-auto"
        user={follower}
      />
    </div>
  );
}
