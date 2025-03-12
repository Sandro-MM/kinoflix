import {useQuery} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {User} from '@ui/types/user';
import {apiClient} from '@common/http/query-client';
import {useParams} from 'react-router';

export interface UseUserProfileResponse extends BackendResponse {
  user: User;
}

export const userProfileQueryKey = (userId: number | string) => [
  'users',
  `${userId}`,
  'profile',
];

export function useUserProfile() {
  const {userId} = useParams();
  return useQuery({
    queryKey: userProfileQueryKey(userId!),
    queryFn: () => fetchProfile(userId!),
  });
}

function fetchProfile(userId: string) {
  return apiClient
    .get<UseUserProfileResponse>(`user-profile/${userId}`)
    .then(response => response.data);
}
