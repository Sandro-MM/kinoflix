import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {TitleTag} from '@app/admin/titles/requests/use-detach-title-tag';
import {CreateTitleTagPayload} from '@app/admin/title-tags/title-tags-editor/requests/use-create-title-tag';

interface Response extends BackendResponse {
  tag: TitleTag;
}

export function useUpdateTitleTag(
  form: UseFormReturn<CreateTitleTagPayload>,
  tag: TitleTag,
) {
  return useMutation({
    mutationFn: (payload: CreateTitleTagPayload) => updateTag(payload, tag),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('title-tags'),
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateTag(
  payload: CreateTitleTagPayload,
  tag: TitleTag,
): Promise<Response> {
  return apiClient
    .put(`title-tags/${tag.model_type}/${tag.id}`, payload)
    .then(r => r.data);
}
