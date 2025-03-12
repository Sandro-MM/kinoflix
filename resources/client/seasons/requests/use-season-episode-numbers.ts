import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {useParams} from 'react-router';
import {BackendResponse} from '@common/http/backend-response/backend-response';

interface Response extends BackendResponse {
  episodeNumbers: number[];
}

export function useSeasonEpisodeNumbers() {
  const {titleId, season} = useParams();
  return useQuery({
    queryKey: [
      'titles',
      `${titleId}`,
      'seasons',
      `${season}`,
      'episodeNumbers',
    ],
    queryFn: () => fetchEpisodeNumbers(titleId!, season!),
  });
}

function fetchEpisodeNumbers(
  titleId: number | string,
  seasonNumber: number | string,
) {
  return apiClient
    .get<Response>(`titles/${titleId}/seasons/${seasonNumber}/episode-numbers`)
    .then(response => response.data);
}
