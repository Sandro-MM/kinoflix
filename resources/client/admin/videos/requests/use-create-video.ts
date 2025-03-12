import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {Video, VideoCaption} from '@app/titles/models/video';

interface Response extends BackendResponse {
  video: Video;
}

export interface CreateVideoPayload {
  name: string;
  title_id: number;
  season_num?: number;
  episode_num?: number;
  thumbnail?: string;
  type: Video['type'];
  src: string;
  quality: Video['quality'];
  language: string;
  category: Video['category'];
  captions?: VideoCaption[];
}

export function useCreateVideo(form: UseFormReturn<CreateVideoPayload>) {
  return useMutation({
    mutationFn: (payload: CreateVideoPayload) => createVideo(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['video']});
    },
    onError: r => (form ? onFormQueryError(r, form) : showHttpErrorToast(r)),
  });
}

function createVideo(payload: CreateVideoPayload): Promise<Response> {
  return apiClient.post(`videos`, payload).then(r => r.data);
}
