import {Channel} from '@common/channels/channel';
import {Title} from '@app/titles/models/title';
import {Person} from '@app/titles/models/person';
import {useDeleteList} from '@app/user-lists/requests/use-delete-list';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import {Trans} from '@ui/i18n/trans';
import React, {Fragment} from 'react';
import {getUserListLink, UserListLink} from '@app/user-lists/user-list-link';
import {Button} from '@ui/buttons/button';
import {Link} from 'react-router';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {UserListByline} from '@app/user-lists/user-list-byline';
import {UserListDetails} from '@app/user-lists/user-list-details';
import clsx from 'clsx';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import {User} from '@ui/types/user';
import {useAuth} from '@common/auth/use-auth';

interface UserListIndexItemProps {
  list: Channel;
  user: User;
  showVisibility?: boolean;
}
export function UserListIndexItem({
  list,
  user,
  showVisibility = true,
}: UserListIndexItemProps) {
  const {user: authUser} = useAuth();
  const canEdit = authUser && authUser.id === user.id;
  return (
    <div className="flex items-center gap-24 border-b py-24">
      {
        <ItemsPreview
          className="max-md:hidden"
          list={list as Channel<Title | Person>}
        />
      }
      <section className="flex-auto">
        <div className="flex items-center gap-8">
          <UserListLink
            list={list}
            className="mr-auto block text-lg font-semibold capitalize"
          />
          {!list.config.preventDeletion && !list.internal && canEdit && (
            <Fragment>
              <Button
                elementType={Link}
                to={`${getUserListLink(list)}/edit`}
                variant="outline"
                size="2xs"
                color="primary"
              >
                <Trans message="Edit" />
              </Button>
              <DialogTrigger type="modal">
                <Button
                  color="danger"
                  variant="outline"
                  radius="rounded"
                  size="2xs"
                >
                  <Trans message="Delete" />
                </Button>
                <DeleteListDialog list={list} />
              </DialogTrigger>
            </Fragment>
          )}
        </div>
        {list.description && (
          <p className="mt-8 whitespace-nowrap text-sm text-muted">
            {list.description}
          </p>
        )}
        <div className="mt-12 text-sm">
          <div className="items-center justify-between gap-24 md:flex">
            {user && <UserListByline user={user} />}
            <UserListDetails
              list={list}
              showVisibility={showVisibility}
              className="max-md:mt-12"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface ItemPreviewProps {
  list: Channel<Title | Person>;
  className?: string;
}
function ItemsPreview({list, className}: ItemPreviewProps) {
  if (!list.items?.length) return null;
  return (
    <div
      className={clsx('flex items-center overflow-hidden rounded', className)}
    >
      {list.items?.map((item, index) => (
        <div
          key={item.id}
          style={{zIndex: 100 - index}}
          className={clsx(
            'relative overflow-hidden rounded shadow-[2px_0_7px_#000]',
            index !== 0 && '-ml-30',
          )}
        >
          {item.model_type === 'title' ? (
            <TitlePoster title={item} size="w-70" srcSize="sm" />
          ) : (
            <PersonPoster person={item} size="w-70" srcSize="sm" />
          )}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(221,238,255,.35)]" />
        </div>
      ))}
    </div>
  );
}

interface DeleteButtonProps {
  list: Channel;
}
function DeleteListDialog({list}: DeleteButtonProps) {
  const deleteList = useDeleteList();
  const {close} = useDialogContext();

  return (
    <ConfirmationDialog
      isDanger
      title={<Trans message="Delete list" />}
      body={<Trans message="Are you sure you want to delete this list?" />}
      confirm={<Trans message="Delete" />}
      isLoading={deleteList.isPending}
      onConfirm={() => deleteList.mutate({listId: list.id}, {onSuccess: close})}
    />
  );
}
