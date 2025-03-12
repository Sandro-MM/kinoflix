import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';

interface Response extends BackendResponse {}

interface Payload {
  articleId: number;
}

export function useDeleteNewsArticle() {
  return useMutation({
    mutationFn: (payload: Payload) => deleteArticle(payload),
    onError: err => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('news'),
      });
      toast(message('Article deleted'));
    },
  });
}

function deleteArticle(payload: Payload): Promise<Response> {
  return apiClient.delete(`news/${payload.articleId}`).then(r => r.data);
}
