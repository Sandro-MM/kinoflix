import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {useParams} from 'react-router';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {titleCreditsQueryKey} from '@app/admin/titles/requests/use-title-credits';
import {CreateTitleCreditPayload} from '@app/admin/titles/requests/use-create-title-credit';

interface Response extends BackendResponse {
  //
}

export interface UpdateTitleCreditPayload
  extends Omit<CreateTitleCreditPayload, 'person_id'> {}

export function useUpdateTitleCredit(
  form: UseFormReturn<UpdateTitleCreditPayload>,
  creditId: number,
) {
  const {titleId, season, episode} = useParams();
  return useMutation({
    mutationFn: (payload: UpdateTitleCreditPayload) =>
      updateTitle(titleId!, season, episode, creditId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: titleCreditsQueryKey(titleId!),
      });
      toast(message('Credit updated'));
    },
    onError: r => onFormQueryError(r, form),
  });
}

function updateTitle(
  titleId: string,
  season: string | undefined,
  episode: string | undefined,
  creditId: number,
  payload: UpdateTitleCreditPayload,
): Promise<Response> {
  payload = {
    ...payload,
    season,
    episode,
  };
  return apiClient
    .put(`titles/${titleId}/credits/${creditId}`, payload)
    .then(r => r.data);
}
