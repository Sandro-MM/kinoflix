import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {reviewsQueryKey} from '@app/reviews/requests/use-reviews';

interface Response extends BackendResponse {
  //
}

interface Payload {
  reviewIds: number[];
}

export function useDeleteReviews() {
  return useMutation({
    mutationFn: (payload: Payload) => deleteReviews(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: reviewsQueryKey()});
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteReviews({reviewIds}: Payload): Promise<Response> {
  return apiClient.delete(`reviews/${reviewIds.join(',')}`).then(r => r.data);
}
