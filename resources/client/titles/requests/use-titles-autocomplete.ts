import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {NormalizedModel} from '@ui/types/normalized-model';

interface AutocompleteTitle extends NormalizedModel {
  seasons_count: number;
  episode_numbers: number[];
}

interface Response extends BackendResponse {
  titles: AutocompleteTitle[];
}

interface Params {
  searchQuery: string;
  selectedTitleId?: number | string;
  seasonNumber?: number | string;
}

export function useTitlesAutocomplete(params: Params) {
  return useQuery({
    queryKey: ['titles', 'autocomplete', params],
    queryFn: () => autocompleteTitles(params),
    placeholderData: keepPreviousData,
  });
}

function autocompleteTitles(params: Params) {
  return apiClient
    .get<Response>(`titles/autocomplete`, {params})
    .then(response => response.data);
}
