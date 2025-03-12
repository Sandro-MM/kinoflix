import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {useParams} from 'react-router';
import {Review} from '@app/titles/models/review';

export function useProfileReviews() {
  const {userId = 'me'} = useParams();
  return useInfiniteData<Review>({
    endpoint: `user-profile/${userId}/reviews`,
    queryKey: ['reviews', 'profile-page-reviews', userId],
    paginate: 'simple',
  });
}
