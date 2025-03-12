import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useParams} from 'react-router';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {titleCreditsQueryKey} from '@app/admin/titles/requests/use-title-credits';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';

interface Response extends BackendResponse {
  //
}

interface Payload {
  ids: number[];
}

export function useSortTitleCredits() {
  const {titleId} = useParams();
  return useMutation({
    mutationFn: (payload: Payload) => sortCredits(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: titleCreditsQueryKey(titleId!),
      });
      toast(message('Credit added'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function sortCredits(payload: Payload): Promise<Response> {
  return apiClient.post(`titles/credits/reorder`, payload).then(r => r.data);
}
