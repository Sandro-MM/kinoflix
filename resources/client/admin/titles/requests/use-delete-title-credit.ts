import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {useParams} from 'react-router';
import {titleCreditsQueryKey} from '@app/admin/titles/requests/use-title-credits';

interface Response extends BackendResponse {}

export function useDeleteTitleCredit(creditId: number) {
  const {titleId, season, episode} = useParams();
  return useMutation({
    mutationFn: () => deleteCredit(titleId!, season, episode, creditId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: titleCreditsQueryKey(titleId!),
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
