import {IllustratedMessage} from '@ui/images/illustrated-message';
import {Trans} from '@ui/i18n/trans';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {PageStatus} from '@common/http/page-status';
import React, {Fragment} from 'react';
import {useUserProfile} from '@app/profile/requests/use-user-profile';
import {RateReviewIcon} from '@ui/icons/material/RateReview';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {Title} from '@app/titles/models/title';
import {TitleLink, TitleLinkWithEpisodeNumber} from '@app/titles/title-link';
import {Episode} from '@app/titles/models/episode';
import {useProfileComments} from '@app/profile/requests/use-profile-comments';
import {Comment} from '@common/comments/comment';
import {ThumbUpIcon} from '@ui/icons/material/ThumbUp';
import {FormattedRelativeTime} from '@ui/i18n/formatted-relative-time';

export function ProfileCommentsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data!.user;
  const commentsQuery = useProfileComments();

  if (commentsQuery.noResults) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<RateReviewIcon className="text-muted" />}
        size="sm"
        title={<Trans message="No comments yet" />}
        description={
          <Trans
            message="Follow :user for updates on comments they post in the future."
            values={{user: user.name}}
          />
        }
      />
    );
  }

  if (commentsQuery.data) {
    return (
      <Fragment>
        {commentsQuery.items.map(comment => {
          if (!comment.commentable) return null;
          return <CommentListItem key={comment.id} comment={comment} />;
        })}
        <InfiniteScrollSentinel query={commentsQuery} />
      </Fragment>
    );
  }

  return <PageStatus query={commentsQuery} />;
}

interface CommentListItemProps {
  comment: Comment;
}
function CommentListItem({comment}: CommentListItemProps) {
  const commentable = comment.commentable as Title | Episode;
  const title =
    commentable.model_type === 'episode' ? commentable.title! : commentable;
  return (
    <div className="mb-24 flex items-start gap-24 border-b pb-24">
      <TitlePoster title={title} size="w-90" srcSize="sm" />
      <div>
        <div className="text-lg font-semibold">
          {commentable.model_type === 'episode' ? (
            <TitleLinkWithEpisodeNumber
              title={title}
              episode={commentable}
              target="_blank"
            />
          ) : (
            <TitleLink title={title} target="_blank" />
          )}
        </div>
        <time className="mt-12 block text-xs text-muted">
          <FormattedRelativeTime date={comment.created_at} />
        </time>
        <p className="mt-8 whitespace-pre-line text-sm">{comment.content}</p>
        {comment.upvotes ? (
          <div className="mt-12 flex items-center gap-8 text-muted">
            <ThumbUpIcon size="sm" />
            <div>{comment.upvotes}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
