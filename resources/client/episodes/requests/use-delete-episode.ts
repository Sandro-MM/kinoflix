import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {Episode} from '@app/titles/models/episode';
import {seasonQueryKey} from '@app/seasons/requests/use-season';

interface Response extends BackendResponse {}

export function useDeleteEpisode(episode: Episode) {
  return useMutation({
    mutationFn: () => deleteEpisode(episode.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: seasonQueryKey(episode.title_id, episode.season_number),
      });
      toast(message('Episode deleted'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function deleteEpisode(seasonId: number | string): Promise<Response> {
  return apiClient.delete(`episodes/${seasonId}`).then(r => r.data);
}
