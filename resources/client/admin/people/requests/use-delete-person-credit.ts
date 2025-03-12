import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {titleCreditsQueryKey} from '@app/admin/titles/requests/use-title-credits';
import {PersonCredit} from '@app/titles/models/title';
import {useParams} from 'react-router';

interface Response extends BackendResponse {}

export function useDeletePersonCredit(credit: PersonCredit) {
  const {personId} = useParams();
  return useMutation({
    mutationFn: () =>
      deleteCredit(credit.id, undefined, undefined, credit.pivot.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: titleCreditsQueryKey(credit.id),
      });
      await queryClient.invalidateQueries({
        queryKey: ['people', `${personId}`],
      });
      toast(message('Credit deleted'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteCredit(
  titleId: number | string,
  season: string | undefined,
  episode: string | undefined,
  creditId: number | string,
): Promise<Response> {
  return apiClient
    .delete(`titles/${titleId}/credits/${creditId}`, {
      params: {season, episode},
    })
    .then(r => r.data);
}
