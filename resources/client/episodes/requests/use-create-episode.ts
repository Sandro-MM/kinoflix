import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {seasonQueryKey} from '@app/seasons/requests/use-season';
import {Episode} from '@app/titles/models/episode';

interface Response extends BackendResponse {
  episode: Episode;
}

export interface CreateEpisodePayload {
  name: string;
  description: string;
  release_date: string;
  runtime: number;
  popularity: number;
  poster: string;
}

export function useCreateEpisode(
  form: UseFormReturn<CreateEpisodePayload>,
  titleId: number,
  season: number | string,
) {
  return useMutation({
    mutationFn: (payload: CreateEpisodePayload) =>
      createEpisode(titleId, season, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: seasonQueryKey(titleId, season),
      });
    },
    onError: r => (form ? onFormQueryError(r, form) : showHttpErrorToast(r)),
  });
}

function createEpisode(
  titleId: number,
  season: number | string,
  payload: CreateEpisodePayload,
): Promise<Response> {
  return apiClient
    .post(`titles/${titleId}/seasons/${season}/episodes`, payload)
    .then(r => r.data);
}
