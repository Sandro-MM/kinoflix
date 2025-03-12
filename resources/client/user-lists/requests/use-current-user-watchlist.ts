import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useAuth} from '@common/auth/use-auth';
import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';

interface Response extends BackendResponse {
  watchlist: {
    id: number;
    items: {
      title: Record<number, boolean>;
      episode: Record<number, boolean>;
    };
  };
}

export function useCurrentUserWatchlist() {
  const {user} = useAuth();
  return useQuery({
    queryKey: ['channel', 'watchlist', 'compact'],
    queryFn: () => fetchWatchlist(),
    enabled: !!user,
  });
}

export function useIsItemWatchlisted(item: Title | Episode) {
  const query = useCurrentUserWatchlist();
  return {
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
    isWatchlisted: !!query.data?.watchlist?.items[item.model_type]?.[item.id],
  };
}

function fetchWatchlist() {
  return apiClient
    .get<Response>(`users/me/watchlist`)
    .then(response => response.data);
}
