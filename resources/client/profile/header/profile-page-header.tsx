import {UserAvatar} from '@common/auth/user-avatar';
import {ProfileDescription} from '@app/profile/header/profile-description';
import {FollowButton} from '@common/users/follow-button';
import React from 'react';
import {useAuth} from '@common/auth/use-auth';
import {User} from '@ui/types/user';
import {Trans} from '@ui/i18n/trans';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {Button} from '@ui/buttons/button';
import {EditIcon} from '@ui/icons/material/Edit';
import {EditUserProfileDialog} from '@app/profile/edit-user-profile-dialog';
import {ProfileStatsList} from '@app/profile/header/profile-stats-list';
import {ProfileLinks} from '@app/profile/header/profile-links';
import {Chip} from '@ui/forms/input-field/chip-field/chip';

interface Props {
  user: User;
}
export function ProfilePageHeader({user}: Props) {
  const {user: currentUser} = useAuth();
  return (
    <div className="flex flex-col items-center gap-24 md:flex-row">
      <UserAvatar user={user} circle size="w-140 h-140" />
      <div className="flex-auto">
        <div className="mb-8 flex items-center gap-8">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          {user.is_pro && (
            <Chip size="xs" color="primary" radius="rounded" className="mt-2">
              <Trans message="PRO" />
            </Chip>
          )}
        </div>
        <ProfileDescription profile={user.profile} />
        <div className="mt-12 flex items-center gap-14">
          {currentUser?.id !== user.id && (
            <FollowButton
              variant="outline"
              color="primary"
              size="xs"
              user={user}
            />
          )}
          {currentUser?.id === user.id && <EditButton user={user} />}
        </div>
      </div>
      <div>
        <ProfileStatsList user={user} />
        <ProfileLinks
          links={user.links}
          className="ml-auto mt-12 flex-shrink-0"
        />
      </div>
    </div>
  );
}

interface EditButtonProps {
  user: User;
}
function EditButton({user}: EditButtonProps) {
  return (
    <DialogTrigger type="modal">
      <Button variant="outline" size="xs" startIcon={<EditIcon />}>
        <Trans message="Edit profile" />
      </Button>
      <EditUserProfileDialog user={user} />
    </DialogTrigger>
  );
}
