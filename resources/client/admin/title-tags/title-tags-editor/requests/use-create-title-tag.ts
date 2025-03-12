import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {TitleTag} from '@app/admin/titles/requests/use-detach-title-tag';

interface Response extends BackendResponse {
  tag: TitleTag;
}

export interface CreateTitleTagPayload {
  name: string;
  display_name: string;
}

export function useCreateTitleTag(
  form: UseFormReturn<CreateTitleTagPayload>,
  type: TitleTag['model_type'],
) {
  return useMutation({
    mutationFn: (props: CreateTitleTagPayload) => createNewTag(props, type),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('title-tags'),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createNewTag(
  payload: CreateTitleTagPayload,
  type: TitleTag['model_type'],
): Promise<Response> {
  return apiClient.post(`title-tags/${type}`, payload).then(r => r.data);
}
