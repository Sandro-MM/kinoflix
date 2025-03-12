import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {titleSeasonsQueryKey} from '@app/titles/requests/use-title-seasons';
import {Title} from '@app/titles/models/title';

interface Response extends BackendResponse {}

export function useDeleteSeason(title: Title, seasonId: number | string) {
  return useMutation({
    mutationFn: () => deleteSeason(seasonId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: titleSeasonsQueryKey(title.id),
      });
      toast(message('Season deleted'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteSeason(seasonId: number | string): Promise<Response> {
  return apiClient.delete(`seasons/${seasonId}`).then(r => r.data);
}
