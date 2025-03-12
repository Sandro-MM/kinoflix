import {IllustratedMessage} from '@ui/images/illustrated-message';
import {Trans} from '@ui/i18n/trans';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {PageStatus} from '@common/http/page-status';
import React, {Fragment} from 'react';
import {useUserProfile} from '@app/profile/requests/use-user-profile';
import {RateReviewIcon} from '@ui/icons/material/RateReview';
import {useProfileReviews} from '@app/profile/requests/use-profile-reviews';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {Title} from '@app/titles/models/title';
import {Review} from '@app/titles/models/review';
import {TitleRating} from '@app/reviews/title-rating';
import {TitleLink, TitleLinkWithEpisodeNumber} from '@app/titles/title-link';
import {Episode} from '@app/titles/models/episode';

export function ProfileReviewsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data!.user;
  const reviewsQuery = useProfileReviews();

  if (reviewsQuery.noResults) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<RateReviewIcon className="text-muted" />}
        size="sm"
        title={<Trans message="No reviews yet" />}
        description={
          <Trans
            message="Follow :user for updates on titles they review in the future."
            values={{user: user.name}}
          />
        }
      />
    );
  }

  if (reviewsQuery.data) {
    return (
      <Fragment>
        {reviewsQuery.items.map(review => (
          <ReviewListItem key={review.id} review={review} />
        ))}
        <InfiniteScrollSentinel query={reviewsQuery} />
      </Fragment>
    );
  }

  return <PageStatus query={reviewsQuery} />;
}

interface ReviewListItemProps {
  review: Review;
}
function ReviewListItem({review}: ReviewListItemProps) {
  const totalVotes = review.helpful_count + review.not_helpful_count;
  const reviewable = review.reviewable as Title | Episode;
  const title =
    reviewable.model_type === 'episode' ? reviewable.title! : reviewable;
  return (
    <div className="mb-24 flex items-start gap-24 border-b pb-24">
      <TitlePoster title={title} size="w-90" srcSize="sm" />
      <div>
        <div className="text-lg font-semibold">
          {reviewable.model_type === 'episode' ? (
            <TitleLinkWithEpisodeNumber
              title={title}
              episode={reviewable}
              target="_blank"
            />
          ) : (
            <TitleLink title={title} target="_blank" />
          )}
        </div>
        <TitleRating className="mb-8 mt-14" score={review.score} />
        <div className="text-base font-semibold">{review.title}</div>
        <p className="mt-10 whitespace-pre-line text-sm">{review.body}</p>
        {totalVotes ? (
          <div className="mt-12 text-xs text-muted">
            <Trans
              message=":helpfulCount out of :total people found this helpful."
              values={{
                helpfulCount: review.helpful_count,
                total: review.helpful_count + review.not_helpful_count,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
