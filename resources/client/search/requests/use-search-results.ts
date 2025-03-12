import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Title} from '@app/titles/models/title';
import {Person} from '@app/titles/models/person';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

export interface SearchResponse extends BackendResponse {
  query: string;
  results: (Title | Person)[];
}

export function useSearchResults(
  loader: 'searchPage' | 'searchAutocomplete',
  query: string = '',
) {
  query = query.trim();
  // sending only dot will cause an error as browser strips it out
  if (query === '.') {
    query = '';
  }
  return useQuery({
    queryKey: ['search', query, loader],
    queryFn: ({signal}) => search(loader, query, signal),
    enabled: !!query,
    placeholderData: !!query ? keepPreviousData : undefined,
    initialData: () => {
      const data = getBootstrapData().loaders?.[loader];
      if (query && data?.query == query) {
        return data;
      }
    },
  });
}

async function search(loader: string, query: string, signal: AbortSignal) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return apiClient
    .get<SearchResponse>(`search/${encodeURIComponent(query)}`, {
      params: {loader},
      signal,
    })
    .then(response => response.data);
}
