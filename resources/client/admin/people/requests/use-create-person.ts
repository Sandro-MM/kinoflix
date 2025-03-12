import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {Person} from '@app/titles/models/person';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';

interface Response extends BackendResponse {
  person: Person;
}

export interface CreatePersonPayload {
  name: string;
  known_for: string;
  poster: string;
  birth_date: string;
  death_date: string;
  birth_place: string;
  description: string;
  gender: string;
  popularity: number;
}

export function useCreatePerson(form: UseFormReturn<CreatePersonPayload>) {
  return useMutation({
    mutationFn: (payload: CreatePersonPayload) => createPerson(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['people']});
      toast(message('Person created'));
    },
    onError: r => onFormQueryError(r, form),
  });
}

function createPerson(payload: CreatePersonPayload): Promise<Response> {
  return apiClient.post(`people`, payload).then(r => r.data);
}
