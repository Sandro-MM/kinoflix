import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {Reviewable} from '@app/reviews/reviewable';
import {Review} from '@app/titles/models/review';
import {useLocalStorage} from '@ui/utils/hooks/local-storage';
import {useSearchParams} from 'react-router';

export interface UseReviewAdditionalData {
  current_user_review?: Review;
  shared_review?: Review;
}

export function reviewsQueryKey(
  reviewable?: Reviewable,
  params?: Record<string, any>,
) {
  const key: any[] = ['reviews'];
  if (reviewable) {
    key.push(`${reviewable.id}-${reviewable.model_type}`);
  }
  if (params) {
    key.push(params);
  }
  return key;
}

export function useReviews(reviewable: Reviewable) {
  const [searchParams] = useSearchParams();
  const [sort] = useLocalStorage(
    `reviewSort.${reviewable.model_type}`,
    'created_at:desc',
  );
  const [defaultOrderBy, defaultOrderDir] = sort.split(':');
  return useInfiniteData<Review, UseReviewAdditionalData>({
    willSortOrFilter: true,
    queryKey: reviewsQueryKey(reviewable, {sort}),
    endpoint: 'reviewable/reviews',
    defaultOrderBy,
    defaultOrderDir: defaultOrderDir as 'asc' | 'desc',
    queryParams: {
      reviewable_type: reviewable.model_type,
      reviewable_id: reviewable.id,
      perPage: 5,
      sharedReviewId: searchParams.get('reviewId'),
    },
  });
}
