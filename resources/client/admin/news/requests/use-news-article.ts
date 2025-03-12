import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {NewsArticle} from '@app/titles/models/news-article';
import {useParams} from 'react-router';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

export interface GetNewsArticleResponse extends BackendResponse {
  article: NewsArticle;
  related: NewsArticle[];
}

export function useNewsArticle(loader: 'newsArticlePage') {
  const {articleId} = useParams();
  return useQuery<GetNewsArticleResponse>({
    queryKey: ['news-articles', `${articleId}`],
    queryFn: () => fetchNewsArticle(articleId!),
    initialData: () => {
      const data = getBootstrapData().loaders?.[loader];
      if (data?.article?.id == articleId) {
        return data;
      }
      return undefined;
    },
  });
}

function fetchNewsArticle(articleId: string) {
  return apiClient
    .get<GetNewsArticleResponse>(`news/${articleId}`)
    .then(response => response.data);
}
