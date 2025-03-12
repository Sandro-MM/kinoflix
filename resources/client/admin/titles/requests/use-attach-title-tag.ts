import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {useParams} from 'react-router';
import {TitleTag} from '@app/admin/titles/requests/use-detach-title-tag';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';

interface Response extends BackendResponse {}

export interface AttachTitleTagPayload {
  tag_name: string;
}

export function useAttachTitleTag(
  form: UseFormReturn<AttachTitleTagPayload>,
  tagType: TitleTag['model_type'],
) {
  const {titleId} = useParams();
  return useMutation({
    mutationFn: (payload: AttachTitleTagPayload) =>
      attachTag(titleId!, tagType, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['titles', `${titleId}`],
      });
      toast(message('Tag attached'));
    },
    onError: r => onFormQueryError(r, form),
  });
}

function attachTag(
  titleId: number | string,
  tagType: TitleTag['model_type'],
  payload: AttachTitleTagPayload,
): Promise<Response> {
  return apiClient
    .post(`titles/${titleId}/tags/${tagType}`, payload)
    .then(r => r.data);
}
