import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@ui/toast/toast';
import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';

interface Response extends BackendResponse {}

interface Payload {
  listId: number | string;
}

export function useDeleteList() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: Payload) => deleteList(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['channel']});
      toast(trans(message('List deleted')));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function deleteList(payload: Payload) {
  return apiClient
    .delete<Response>(`channel/${payload.listId}`)
    .then(r => r.data);
}
