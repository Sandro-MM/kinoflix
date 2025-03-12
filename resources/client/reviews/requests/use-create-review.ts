import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {Review} from '@app/titles/models/review';
import {Reviewable} from '@app/reviews/reviewable';
import {UseFormReturn} from 'react-hook-form';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {reviewsQueryKey} from '@app/reviews/requests/use-reviews';

interface Response extends BackendResponse {
  review: Review;
}

export interface CreateReviewPayload {
  score: number;
  title?: string;
  body?: string;
}

interface Payload extends CreateReviewPayload {
  reviewable: Reviewable;
}

export function useCreateReview(form?: UseFormReturn<CreateReviewPayload>) {
  return useMutation({
    mutationFn: (payload: Payload) => createReview(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: reviewsQueryKey()});
    },
    onError: r => (form ? onFormQueryError(r, form) : showHttpErrorToast(r)),
  });
}

function createReview(payload: Payload): Promise<Response> {
  return apiClient
    .post(`reviews`, {
      reviewable_id: payload.reviewable.id,
      reviewable_type: payload.reviewable.model_type,
      score: payload.score,
      title: payload.title,
      body: payload.body,
    })
    .then(r => r.data);
}
