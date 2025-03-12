import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {useParams} from 'react-router';
import {User} from '@ui/types/user';

export function useProfileFollowedUsers() {
  const {userId = 'me'} = useParams();
  return useInfiniteData<User>({
    endpoint: `users/${userId}/followed-users`,
    queryKey: ['users', 'profile-page-followed-users', userId],
    paginate: 'simple',
  });
}
