import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {Review} from '@app/titles/models/review';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';

interface Response extends BackendResponse {
  review: Review;
}

interface Payload {
  isHelpful: boolean;
}

export function useSubmitReviewFeedback(review: Review) {
  return useMutation({
    mutationFn: (payload: Payload) => submitFeedback(payload, review),
    onSuccess: () => {
      toast(message('Feedback submitted'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function submitFeedback(payload: Payload, review: Review): Promise<Response> {
  return apiClient
    .post(`reviews/${review.id}/feedback`, {
      is_helpful: payload.isHelpful,
    })
    .then(r => r.data);
}
