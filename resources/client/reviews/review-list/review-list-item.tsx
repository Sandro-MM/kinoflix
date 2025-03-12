import {Review} from '@app/titles/models/review';
import {UserAvatar} from '@common/auth/user-avatar';
import {FormattedRelativeTime} from '@ui/i18n/formatted-relative-time';
import {TitleRating} from '@app/reviews/title-rating';
import {Trans} from '@ui/i18n/trans';
import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Link, useLocation} from 'react-router';
import {Button} from '@ui/buttons/button';
import {useSubmitReviewFeedback} from '@app/reviews/requests/use-submit-review-feedback';
import clsx from 'clsx';
import {useAuth} from '@common/auth/use-auth';
import {useAuthClickCapture} from '@app/use-auth-click-capture';
import {IconButton} from '@ui/buttons/icon-button';
import {Tooltip} from '@ui/tooltip/tooltip';
import {useSubmitReport} from '@common/reports/requests/use-submit-report';
import {useDeleteReport} from '@common/reports/requests/use-delete-report';
import {ShareIcon} from '@ui/icons/material/Share';
import useClipboard from 'react-use-clipboard';
import {useSettings} from '@ui/settings/use-settings';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {Menu, MenuItem, MenuTrigger} from '@ui/menu/menu-trigger';
import {MoreVertIcon} from '@ui/icons/material/MoreVert';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import {useDeleteReviews} from '@app/reviews/requests/use-delete-reviews';
import {User} from '@ui/types/user';
import {SiteConfigContext} from '@common/core/settings/site-config-context';
import {useIsMobileMediaQuery} from '@ui/utils/hooks/is-mobile-media-query';
import {Avatar} from '@ui/avatar/avatar';

interface Props {
  review: Review;
  isShared?: boolean;
  hideShareButton?: boolean;
  avatar?: ReactElement;
}
export function ReviewListItem({
  review,
  isShared,
  hideShareButton,
  avatar,
}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const ref = useRef<HTMLDivElement>(null);
  const scrolled = useRef(false);

  useEffect(() => {
    if (isShared && !scrolled.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
        scrolled.current = true;
      }, 50);
    }
  }, [isShared]);

  const defaultAvatar = review.user ? (
    <UserAvatar user={review.user} size="xl" circle />
  ) : (
    <Avatar size="xl" label="User" />
  );

  return (
    <div ref={ref}>
      {isShared && (
        <div className="mb-8 mt-16 text-sm">
          <Trans message="Shared review" />
        </div>
      )}
      <div
        className={clsx(
          'group flex min-h-70 items-start gap-24 rounded py-18',
          isShared && 'mb-34 border bg-alt pl-12',
        )}
      >
        {!isMobile && (avatar || defaultAvatar)}
        <div className="flex-auto text-sm">
          <div className="mb-4 flex items-center gap-8">
            {review.user && <UserDisplayName user={review.user} />}
            <time className="text-xs text-muted">
              <FormattedRelativeTime date={review.created_at} />
            </time>
          </div>
          <TitleRating className="mb-8 mt-10" score={review.score} />
          {review.title && (
            <div className="mb-8 text-base font-medium">{review.title}</div>
          )}
          <div className="whitespace-break-spaces text-sm">{review.body}</div>
          <div className="mt-16 items-center gap-8 md:flex">
            <Feedback review={review} />
            {!hideShareButton && <ShareButton review={review} />}
            <ReviewOptionsTrigger review={review} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ShareButtonProps {
  review: Review;
}
function ShareButton({review}: ShareButtonProps) {
  const {base_url} = useSettings();
  const location = useLocation();
  const url = `${base_url}${location.pathname}?reviewId=${review.id}`;
  const [, copyLink] = useClipboard(url);
  return (
    <Tooltip label={<Trans message="Share" />}>
      <IconButton
        className="text-muted"
        onClick={() => {
          copyLink();
          toast(message('Review link copied to clipboard'));
        }}
      >
        <ShareIcon />
      </IconButton>
    </Tooltip>
  );
}

interface FeedbackProps {
  review: Review;
}
function Feedback({review}: FeedbackProps) {
  const {user} = useAuth();
  const authHandler = useAuthClickCapture();
  const submitFeedback = useSubmitReviewFeedback(review);
  const isDisabled =
    submitFeedback.isPending || (user != null && user.id === review.user_id);

  const [helpfulCount, setHelpfulCount] = useState(review.helpful_count || 1);
  const [total, setTotal] = useState(
    review.helpful_count + review.not_helpful_count || 1,
  );

  let initialFeedback: string | undefined;
  if (review.current_user_feedback != null) {
    initialFeedback = review.current_user_feedback ? 'helpful' : 'not_helpful';
  }
  const [currentFeedback, setCurrentFeedback] = useState<string | undefined>(
    initialFeedback,
  );

  return (
    <div className="mr-auto flex flex-wrap items-center gap-6 max-md:mb-12">
      <div className="text-xs text-muted">
        <Trans
          message=":helpfulCount out of :total people found this helpful. Was this review helpful?"
          values={{helpfulCount, total}}
        />
      </div>
      <div className="flex items-center gap-6 pb-2">
        <Button
          variant="link"
          className={clsx(
            'uppercase',
            currentFeedback === 'helpful' && 'pointer-events-none',
          )}
          color={currentFeedback === 'helpful' ? 'primary' : undefined}
          disabled={isDisabled}
          onClickCapture={authHandler}
          onClick={() =>
            submitFeedback.mutate(
              {isHelpful: true},
              {
                onSuccess: () => {
                  setHelpfulCount(count => count + 1);
                  setCurrentFeedback('helpful');
                  if (!currentFeedback) {
                    setTotal(count => count + 1);
                  }
                },
              },
            )
          }
        >
          <Trans message="Yes" />
        </Button>
        <div className="h-14 w-1 bg-divider"></div>
        <Button
          variant="link"
          className={clsx(
            'uppercase',
            currentFeedback === 'not_helpful' && 'pointer-events-none',
          )}
          color={currentFeedback === 'not_helpful' ? 'primary' : undefined}
          disabled={isDisabled}
          onClickCapture={authHandler}
          onClick={() =>
            submitFeedback.mutate(
              {isHelpful: false},
              {
                onSuccess: () => {
                  setHelpfulCount(count => count - 1);
                  setCurrentFeedback('not_helpful');
                  if (!currentFeedback) {
                    setTotal(count => count + 1);
                  }
                },
              },
            )
          }
        >
          <Trans message="No" />
        </Button>
      </div>
    </div>
  );
}

interface ReviewOptionsTriggerProps {
  review: Review;
}
export function ReviewOptionsTrigger({review}: ReviewOptionsTriggerProps) {
  const {user, hasPermission} = useAuth();
  const report = useSubmitReport(review);
  const deleteReport = useDeleteReport(review);
  const [isReported, setIsReported] = useState(review.current_user_reported);
  const handleReport = () => {
    if (isReported) {
      deleteReport.mutate(undefined, {
        onSuccess: () => setIsReported(false),
      });
    } else {
      report.mutate({}, {onSuccess: () => setIsReported(true)});
    }
  };

  const deleteReview = useDeleteReviews();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const showDeleteButton =
    (user && review.user_id === user.id) || hasPermission('reviews.delete');
  const handleDelete = (isConfirmed: boolean) => {
    setIsDeleteDialogOpen(false);
    if (isConfirmed) {
      deleteReview.mutate({reviewIds: [review.id]});
    }
  };

  return (
    <Fragment>
      <MenuTrigger>
        <IconButton className="text-muted" aria-label="More options">
          <MoreVertIcon />
        </IconButton>
        <Menu>
          <MenuItem value="report" onSelected={() => handleReport()}>
            {isReported ? (
              <Trans message="Remove report" />
            ) : (
              <Trans message="Report review" />
            )}
          </MenuItem>
          {showDeleteButton && (
            <MenuItem
              value="delete"
              onSelected={() => setIsDeleteDialogOpen(true)}
            >
              <Trans message="Delete" />
            </MenuItem>
          )}
        </Menu>
      </MenuTrigger>
      <DialogTrigger
        type="modal"
        isOpen={isDeleteDialogOpen}
        onClose={isConfirmed => handleDelete(isConfirmed)}
      >
        <ConfirmationDialog
          isDanger
          title={<Trans message="Delete review?" />}
          body={
            <Trans message="Are you sure you want to delete this review?" />
          }
          confirm={<Trans message="Delete" />}
        />
      </DialogTrigger>
    </Fragment>
  );
}

interface UserDisplayNameProps {
  user: User;
}
function UserDisplayName({user}: UserDisplayNameProps) {
  const isMobile = useIsMobileMediaQuery();
  const {auth} = useContext(SiteConfigContext);
  const sharedClassName = 'flex items-center gap-8 text-base font-medium';
  if (auth.getUserProfileLink) {
    return (
      <Fragment>
        {isMobile && <UserAvatar user={user} size="sm" circle />}
        <Link
          to={auth.getUserProfileLink(user)}
          className={clsx('hover:underline', sharedClassName)}
        >
          {user.name}
        </Link>
      </Fragment>
    );
  }
  return (
    <div className={sharedClassName}>
      {isMobile && <UserAvatar user={user} size="sm" circle />}
      {user.name}
    </div>
  );
}
