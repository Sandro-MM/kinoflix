import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {useParams} from 'react-router';
import {Comment} from '@common/comments/comment';

export function useProfileComments() {
  const {userId = 'me'} = useParams();
  return useInfiniteData<Comment>({
    endpoint: `user-profile/${userId}/comments`,
    queryKey: ['comment', 'profile-page-comments', userId],
    paginate: 'simple',
  });
}
