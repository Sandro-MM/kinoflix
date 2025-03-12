import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {useParams} from 'react-router';

interface Response extends BackendResponse {}

export function useDeleteImage(imageId: number | string) {
  const {titleId} = useParams();
  return useMutation({
    mutationFn: () => deleteImage(imageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['titles', `${titleId}`]});
      toast(message('Image deleted'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteImage(imageId: number | string): Promise<Response> {
  return apiClient.delete(`images/${imageId}`).then(r => r.data);
}
