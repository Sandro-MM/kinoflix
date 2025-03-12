import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {NewsArticle} from '@app/titles/models/news-article';

interface Response {
  news_articles: NewsArticle[];
}

export function useTitleNews(titleId: number | string) {
  return useQuery({
    queryKey: ['titles', `${titleId}`, 'news'],
    queryFn: () => fetchNews(titleId),
  });
}

function fetchNews(titleId: number | string) {
  return apiClient
    .get<Response>(`titles/${titleId}/news`)
    .then(response => response.data);
}
