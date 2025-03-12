import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {titleSeasonsQueryKey} from '@app/titles/requests/use-title-seasons';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {Season} from '@app/titles/models/season';

interface Response extends BackendResponse {
  season: Season;
}

export function useCreateSeason(titleId: number) {
  return useMutation({
    mutationFn: () => createSeason(titleId),
    onSuccess: async response => {
      await queryClient.invalidateQueries({
        queryKey: titleSeasonsQueryKey(response.season.title_id),
      });
      toast(
        message('Season :number created', {
          values: {number: response.season.number},
        }),
      );
    },
    onError: r => showHttpErrorToast(r),
  });
}

function createSeason(titleId: number): Promise<Response> {
  return apiClient.post(`titles/${titleId}/seasons`).then(r => r.data);
}
