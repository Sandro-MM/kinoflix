import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {Title} from '@app/titles/models/title';
import {useCurrentUserWatchlist} from '@app/user-lists/requests/use-current-user-watchlist';

interface Response extends BackendResponse {}

export function useAddToWatchlist() {
  const {data} = useCurrentUserWatchlist();
  return useMutation({
    mutationFn: (payload: Title) =>
      addToWatchlist(data!.watchlist!.id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['channel', 'watchlist'],
      });
      toast(message('Added to your watchlist'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function addToWatchlist(listId: number, payload: Title): Promise<Response> {
  return apiClient
    .post(`channel/${listId}/add`, {
      itemId: payload.id,
      itemType: payload.model_type,
    })
    .then(r => r.data);
}
