import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {Person} from '@app/titles/models/person';
import {CreatePersonPayload} from '@app/admin/people/requests/use-create-person';
import {useParams} from 'react-router';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';

interface Response extends BackendResponse {
  person: Person;
}

export function useUpdatePerson(form: UseFormReturn<CreatePersonPayload>) {
  const {personId} = useParams();
  return useMutation({
    mutationFn: (payload: CreatePersonPayload) =>
      updatePerson(payload, personId!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['people', `${personId}`],
      });
      toast(message('Person updated'));
    },
    onError: r => onFormQueryError(r, form),
  });
}

function updatePerson(
  payload: CreatePersonPayload,
  personId: string,
): Promise<Response> {
  return apiClient.put(`people/${personId}`, payload).then(r => r.data);
}
