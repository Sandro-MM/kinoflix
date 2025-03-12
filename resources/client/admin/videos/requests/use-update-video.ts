import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {Video} from '@app/titles/models/video';
import {CreateVideoPayload} from '@app/admin/videos/requests/use-create-video';
import {useParams} from 'react-router';

interface Response extends BackendResponse {
  video: Video;
}

export function useUpdateVideo(form: UseFormReturn<CreateVideoPayload>) {
  const {videoId} = useParams();
  return useMutation({
    mutationFn: (payload: CreateVideoPayload) => updateVideo(videoId!, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['video']});
    },
    onError: r => onFormQueryError(r, form),
  });
}

function updateVideo(
  videoId: string | number,
  payload: CreateVideoPayload,
): Promise<Response> {
  return apiClient.put(`videos/${videoId}`, payload).then(r => r.data);
}
