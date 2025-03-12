import {useInfiniteData} from '@common/ui/infinite-scroll/use-infinite-data';
import {useParams} from 'react-router';
import {Channel} from '@common/channels/channel';

export function useProfileLists() {
  const {userId = 'me'} = useParams();
  return useInfiniteData<Channel>({
    endpoint: `user-profile/${userId}/lists`,
    queryKey: ['channel', 'profile-lists', userId],
    paginate: 'simple',
  });
}
