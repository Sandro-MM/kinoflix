import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@ui/toast/toast';
import {apiClient, queryClient} from '@common/http/query-client';
import {message} from '@ui/i18n/message';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';

interface Response extends BackendResponse {}

export function useImportNewsArticles() {
  return useMutation({
    mutationFn: () => importArticles(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['news']});
      toast(message('Imported news articles'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function importArticles(): Promise<Response> {
  return apiClient.post(`news/import-from-remote-provider`).then(r => r.data);
}
