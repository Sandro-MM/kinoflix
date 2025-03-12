import {Trans} from '@ui/i18n/trans';
import React, {Fragment} from 'react';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {BookmarkBorderIcon} from '@ui/icons/material/BookmarkBorder';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {useUserProfile} from '@app/profile/requests/use-user-profile';
import {FollowerListItem} from '@app/profile/follower-list-item';
import {useProfileFollowedUsers} from '@app/profile/requests/use-profile-followed-users';
import {PageStatus} from '@common/http/page-status';

export function ProfileFollowedUsersPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data!.user;
  const followedUsersQuery = useProfileFollowedUsers();

  if (followedUsersQuery.noResults) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<BookmarkBorderIcon className="text-muted" />}
        size="sm"
        title={<Trans message="Not following anyone yet" />}
        description={
          <Trans
            message="Check back later to see users :user is following."
            values={{user: user.name}}
          />
        }
      />
    );
  }

  if (followedUsersQuery.data) {
    return (
      <Fragment>
        {followedUsersQuery.items.map(followedUser => (
          <FollowerListItem key={followedUser.id} follower={followedUser} />
        ))}
        <InfiniteScrollSentinel query={followedUsersQuery} />
      </Fragment>
    );
  }

  return <PageStatus query={followedUsersQuery} />;
}
