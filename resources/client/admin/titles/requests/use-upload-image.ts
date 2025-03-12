import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {TitleImage} from '@app/titles/models/title-image';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {useParams} from 'react-router';

interface Response extends BackendResponse {
  image: TitleImage;
}

interface Payload {
  titleId: number | string;
  file: File;
}

export function useUploadImage() {
  const {titleId} = useParams();
  return useMutation({
    mutationFn: (payload: Payload) => uploadImage(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['titles', `${titleId}`]});
      toast(message('Image uploaded'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function uploadImage(payload: Payload): Promise<Response> {
  const formData = new FormData();
  formData.append('titleId', payload.titleId.toString());
  formData.append('file', payload.file);
  return apiClient.post(`images`, formData).then(r => r.data);
}
