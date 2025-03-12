import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {Button} from '@ui/buttons/button';
import {Trans} from '@ui/i18n/trans';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import React from 'react';
import {ButtonVariant} from '@ui/buttons/get-shared-button-style';
import {ButtonSize} from '@ui/buttons/button-size';
import {useDeleteReviews} from '@app/reviews/requests/use-delete-reviews';

interface Props {
  reviewIds: number[];
  variant?: ButtonVariant;
  size?: ButtonSize;
}
export function DeleteReviewsButton({
  reviewIds,
  variant = 'outline',
  size = 'xs',
}: Props) {
  const deleteReviews = useDeleteReviews();
  return (
    <DialogTrigger
      type="modal"
      onClose={isConfirmed => {
        if (isConfirmed) {
          deleteReviews.mutate({reviewIds});
        }
      }}
    >
      <Button
        variant={variant}
        size={size}
        color="danger"
        className="mr-10"
        disabled={deleteReviews.isPending}
      >
        <Trans message="Delete" />
      </Button>
      <ConfirmationDialog
        isDanger
        title={
          <Trans
            message="Delete [one review|other :count reviews]"
            values={{count: reviewIds.length}}
          />
        }
        body={
          reviewIds.length > 1 ? (
            <Trans message="Are you sure you want to delete selected reviews?" />
          ) : (
            <Trans message="Are you sure you want to delete this review?" />
          )
        }
        confirm={<Trans message="Delete" />}
      />
    </DialogTrigger>
  );
}
