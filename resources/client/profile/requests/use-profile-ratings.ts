import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {useParams} from 'react-router';
import {Review} from '@app/titles/models/review';

export function useProfileRatings() {
  const {userId = 'me'} = useParams();
  return useInfiniteData<Review>({
    endpoint: `user-profile/${userId}/ratings`,
    queryKey: ['reviews', 'profile-page-ratings', userId],
    paginate: 'simple',
  });
}
