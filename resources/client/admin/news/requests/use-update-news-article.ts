import {useMutation} from '@tanstack/react-query';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {NewsArticle} from '@app/titles/models/news-article';
import {CreateNewsArticlePayload} from '@app/admin/news/requests/use-create-news-article';
import {useParams} from 'react-router';

interface Response extends BackendResponse {
  article: NewsArticle;
}

export function useUpdateNewsArticle() {
  const {articleId} = useParams();
  return useMutation({
    mutationFn: (payload: CreateNewsArticlePayload) =>
      updateArticle(articleId!, payload),
    onError: err => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['news']});
      toast(message('Article updated'));
    },
  });
}

function updateArticle(
  articleId: string,
  payload: CreateNewsArticlePayload,
): Promise<Response> {
  return apiClient.put(`news/${articleId}`, payload).then(r => r.data);
}
