import {useProfileLists} from '@app/profile/requests/use-profile-lists';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {ListAltIcon} from '@ui/icons/material/ListAlt';
import {Trans} from '@ui/i18n/trans';
import {UserListIndexItem} from '@app/user-lists/pages/user-lists-index-page/user-list-index-item';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {PageStatus} from '@common/http/page-status';
import React from 'react';
import {useUserProfile} from '@app/profile/requests/use-user-profile';

export function ProfileListsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data!.user;
  const listsQuery = useProfileLists();

  if (listsQuery.noResults) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<ListAltIcon className="text-muted" />}
        size="sm"
        title={<Trans message="No lists yet" />}
        description={
          <Trans
            message="Follow :user for updates on lists they create in the future."
            values={{user: user.name}}
          />
        }
      />
    );
  }

  if (listsQuery.data) {
    return (
      <div>
        {listsQuery.items.map(list => (
          <UserListIndexItem
            key={list.id}
            list={list}
            user={user}
            showVisibility={false}
          />
        ))}
        <InfiniteScrollSentinel query={listsQuery} />
      </div>
    );
  }

  return <PageStatus query={listsQuery} />;
}
