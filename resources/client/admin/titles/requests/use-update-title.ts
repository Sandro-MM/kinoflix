import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {useParams} from 'react-router';
import {Title} from '@app/titles/models/title';
import {CreateTitlePayload} from '@app/admin/titles/requests/use-create-title';

interface Response extends BackendResponse {
  title: Title;
}

export function useUpdateTitle(form: UseFormReturn<CreateTitlePayload>) {
  const {titleId} = useParams();
  return useMutation({
    mutationFn: (payload: CreateTitlePayload) => updateTitle(titleId!, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['titles']});
    },
    onError: r => onFormQueryError(r, form),
  });
}

function updateTitle(
  titleId: string,
  payload: CreateTitlePayload,
): Promise<Response> {
  return apiClient.put(`titles/${titleId}`, payload).then(r => r.data);
}
