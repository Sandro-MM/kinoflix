import {Button, ButtonProps} from '@ui/buttons/button';
import {AddIcon} from '@ui/icons/material/Add';
import {Trans} from '@ui/i18n/trans';
import {Title} from '@app/titles/models/title';
import {CheckIcon} from '@ui/icons/material/Check';
import {useAddToWatchlist} from '@app/user-lists/requests/use-add-to-watchlist';
import {useRemoveFromWatchlist} from '@app/user-lists/requests/use-remove-from-watchlist';
import {useIsItemWatchlisted} from '@app/user-lists/requests/use-current-user-watchlist';
import {useAuthClickCapture} from '@app/use-auth-click-capture';
import React from 'react';
import clsx from 'clsx';

interface Props {
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  item: Title;
  size?: 'sm' | 'lg';
  className?: string;
}
export function WatchlistButton({
  item,
  variant = 'flat',
  color = 'primary',
  size = 'lg',
  className,
}: Props) {
  const {isLoading, isWatchlisted} = useIsItemWatchlisted(item);
  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();
  const authHandler = useAuthClickCapture();

  return (
    <Button
      variant={variant}
      color={color}
      size={size === 'sm' ? 'xs' : undefined}
      className={clsx(size === 'lg' && 'mt-14 min-h-40 w-full', className)}
      startIcon={isWatchlisted ? <CheckIcon /> : <AddIcon />}
      disabled={
        addToWatchlist.isPending || removeFromWatchlist.isPending || isLoading
      }
      onClickCapture={authHandler}
      onClick={() => {
        if (isWatchlisted) {
          removeFromWatchlist.mutate(item);
        } else {
          addToWatchlist.mutate(item);
        }
      }}
    >
      {isWatchlisted ? (
        <Trans message="In watchlist" />
      ) : size === 'sm' ? (
        <Trans message="Watchlist" />
      ) : (
        <Trans message="Add to watchlist" />
      )}
    </Button>
  );
}
