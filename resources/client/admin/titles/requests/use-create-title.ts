import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {Title} from '@app/titles/models/title';
import {CreateVideoPayload} from '@app/admin/videos/requests/use-create-video';

interface Response extends BackendResponse {
  title: Title;
}

export interface CreateTitlePayload {
  name: string;
  original_title: string;
  is_series: boolean;
  poster: string;
  backdrop: string;
  release_date: string;
  tagline: string;
  description: string;
  runtime: number;
  certification: string;
  budget: number;
  revenue: number;
  language: string;
  popularity: number;
  images: {url: string}[];
  videos: CreateVideoPayload[];
}

export function useCreateTitle(form: UseFormReturn<CreateTitlePayload>) {
  return useMutation({
    mutationFn: (payload: CreateTitlePayload) => createTitle(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['titles']});
    },
    onError: r => (form ? onFormQueryError(r, form) : showHttpErrorToast(r)),
  });
}

function createTitle(payload: CreateTitlePayload): Promise<Response> {
  return apiClient.post(`titles`, payload).then(r => r.data);
}
