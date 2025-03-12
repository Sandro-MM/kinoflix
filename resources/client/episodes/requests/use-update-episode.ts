import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {seasonQueryKey} from '@app/seasons/requests/use-season';
import {CreateEpisodePayload} from '@app/episodes/requests/use-create-episode';
import {Episode} from '@app/titles/models/episode';

interface Response extends BackendResponse {
  episode: Episode;
}

export function useUpdateEpisode(
  titleId: number | string,
  season: number | string,
  episode: number | string,
  form: UseFormReturn<CreateEpisodePayload>,
) {
  return useMutation({
    mutationFn: (payload: CreateEpisodePayload) =>
      updateEpisode(titleId, season, episode, payload),
    onSuccess: async ({episode}) => {
      await queryClient.invalidateQueries({
        queryKey: seasonQueryKey(episode.title_id, episode.season_number),
      });
    },
    onError: r => onFormQueryError(r, form),
  });
}

function updateEpisode(
  titleId: number | string,
  season: number | string,
  episode: number | string,
  payload: CreateEpisodePayload,
): Promise<Response> {
  return apiClient
    .put(`titles/${titleId}/seasons/${season}/episodes/${episode}`, payload)
    .then(r => r.data);
}
