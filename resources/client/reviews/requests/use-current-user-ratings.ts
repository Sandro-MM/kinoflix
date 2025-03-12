import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useAuth} from '@common/auth/use-auth';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';

interface Response extends BackendResponse {
  ratings: {
    episode: Record<number, {id: number; score: number}>;
    title: Record<number, {id: number; score: number}>;
  };
}

export function useCurrentUserRatings() {
  const {user} = useAuth();
  return useQuery({
    queryKey: ['reviews', 'users', `${user?.id}`],
    queryFn: () => fetchRatings(),
    enabled: !!user,
  });
}

export function useCurrentUserRatingFor(item: Title | Episode) {
  const query = useCurrentUserRatings();
  return {
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
    rating: query.data?.ratings?.[item.model_type]?.[item.id],
  };
}

function fetchRatings() {
  return apiClient
    .get<Response>(`users/me/ratings`)
    .then(response => response.data);
}
