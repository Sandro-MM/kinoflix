import {IllustratedMessage} from '@ui/images/illustrated-message';
import {Trans} from '@ui/i18n/trans';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {PageStatus} from '@common/http/page-status';
import React, {Fragment} from 'react';
import {StarIcon} from '@ui/icons/material/Star';
import {useProfileRatings} from '@app/profile/requests/use-profile-ratings';
import {ContentGridLayout} from '@app/channels/content-grid/content-grid-layout';
import {Title} from '@app/titles/models/title';
import {TitlePortraitGridItem} from '@app/channels/content-grid/title-grid-item';
import {useUserProfile} from '@app/profile/requests/use-user-profile';
import {Episode} from '@app/titles/models/episode';
import {EpisodePortraitGridItem} from '@app/channels/content-grid/episode-grid-item';

export function ProfileRatingsPanel() {
  const userQuery = useUserProfile();
  const user = userQuery.data!.user;
  const ratingsQuery = useProfileRatings();

  if (ratingsQuery.noResults) {
    return (
      <IllustratedMessage
        imageHeight="h-auto"
        imageMargin="mb-14"
        image={<StarIcon className="text-muted" />}
        size="sm"
        title={<Trans message="No ratings yet" />}
        description={
          <Trans
            message="Follow :user for updates on titles they rate in the future."
            values={{user: user.name}}
          />
        }
      />
    );
  }

  if (ratingsQuery.data) {
    return (
      <Fragment>
        <ContentGridLayout variant="portrait">
          {ratingsQuery.items.map(review => {
            const reviewable = review.reviewable as Title | Episode;
            if (reviewable.model_type === 'episode') {
              return (
                <EpisodePortraitGridItem
                  key={review.id}
                  item={reviewable}
                  title={reviewable.title!}
                  rating={review.score}
                />
              );
            }
            return (
              <TitlePortraitGridItem
                item={review.reviewable as Title}
                key={review.id}
                rating={review.score}
              />
            );
          })}
        </ContentGridLayout>
        <InfiniteScrollSentinel query={ratingsQuery} />
      </Fragment>
    );
  }

  return <PageStatus query={ratingsQuery} />;
}
