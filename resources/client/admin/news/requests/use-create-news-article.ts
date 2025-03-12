import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {NewsArticle} from '@app/titles/models/news-article';

interface Response extends BackendResponse {
  article: NewsArticle;
}

export interface CreateNewsArticlePayload {
  title?: string;
  body?: string;
  slug?: string;
  image?: string;
}

export function useCreatNewsArticle() {
  return useMutation({
    mutationFn: (payload: CreateNewsArticlePayload) => createArticle(payload),
    onError: err => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['news']});
      toast(message('Article created'));
    },
  });
}

function createArticle(payload: CreateNewsArticlePayload): Promise<Response> {
  return apiClient.post(`news`, payload).then(r => r.data);
}
