import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {useAuth} from '@common/auth/use-auth';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import {Channel} from '@common/channels/channel';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

export interface FetchAllUserListsResponse
  extends PaginatedBackendResponse<Channel> {}

export function useAllUserLists() {
  const {user} = useAuth();
  const params = {
    userId: user?.id,
    type: 'list',
    perPage: 100,
    loadItemsCount: true,
    loadFirstItems: true,
  };
  return useQuery({
    queryKey: DatatableDataQueryKey('channel', params),
    queryFn: () => fetchLists(params),
    enabled: !!user,
  });
}

function fetchLists(params: Record<string, any>) {
  return apiClient
    .get<FetchAllUserListsResponse>(`channel`, {params})
    .then(response => response.data);
}
