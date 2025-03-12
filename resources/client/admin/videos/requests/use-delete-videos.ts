import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';

interface Response extends BackendResponse {
  //
}

interface Payload {
  videoIds: number[];
}

export function useDeleteVideos() {
  return useMutation({
    mutationFn: (payload: Payload) => deleteVideos(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['video']});
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteVideos({videoIds}: Payload): Promise<Response> {
  return apiClient.delete(`videos/${videoIds.join(',')}`).then(r => r.data);
}
