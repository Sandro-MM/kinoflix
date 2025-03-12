import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {useParams} from 'react-router';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {titleCreditsQueryKey} from '@app/admin/titles/requests/use-title-credits';

interface Response extends BackendResponse {
  //
}

export interface CreateTitleCreditPayload {
  person_id: number;
  character: string;
  department: string;
  job: string;
  season?: number | string;
  episode?: number | string;
}

export function useCreateTitleCredit(
  form: UseFormReturn<CreateTitleCreditPayload>,
) {
  const {titleId, season, episode} = useParams();
  return useMutation({
    mutationFn: (payload: CreateTitleCreditPayload) =>
      createCredit(titleId!, season, episode, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: titleCreditsQueryKey(titleId!),
      });
      toast(message('Credit added'));
    },
    onError: r => onFormQueryError(r, form),
  });
}

function createCredit(
  titleId: number | string,
  season: number | string | undefined,
  episode: number | string | undefined,
  payload: CreateTitleCreditPayload,
): Promise<Response> {
  payload = {
    ...payload,
    season,
    episode,
  };
  return apiClient.post(`titles/${titleId}/credits`, payload).then(r => r.data);
}
