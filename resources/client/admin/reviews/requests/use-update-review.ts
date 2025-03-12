import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {Review} from '@app/titles/models/review';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {CreateReviewPayload} from '@app/reviews/requests/use-create-review';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';

interface Response extends BackendResponse {
  review: Review;
}

export function useUpdateReview(
  review: Review,
  form?: UseFormReturn<CreateReviewPayload>,
) {
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => updateReview(review, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['reviews']});
      toast(message('Review updated'));
    },
    onError: r => (form ? onFormQueryError(r, form) : showHttpErrorToast(r)),
  });
}

function updateReview(
  review: Review,
  payload: CreateReviewPayload,
): Promise<Response> {
  return apiClient
    .put(`reviews/${review.id}`, {
      score: payload.score,
      title: payload.title,
      body: payload.body,
    })
    .then(r => r.data);
}
