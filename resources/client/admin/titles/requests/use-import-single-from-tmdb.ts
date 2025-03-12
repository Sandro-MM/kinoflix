import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@ui/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {Title} from '@app/titles/models/title';
import {Person} from '@app/titles/models/person';

interface Response extends BackendResponse {
  mediaItem: Title | Person;
}

export interface ImportMediaItemPayload {
  tmdb_id: string;
  media_type: 'movie' | 'series' | 'person';
}

export function useImportSingleFromTmdb() {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: ImportMediaItemPayload) => importMediaItem(props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('titles'),
      });
      toast(trans(message('Item imported')));
    },
    onError: err => showHttpErrorToast(err),
  });
}

function importMediaItem(payload: ImportMediaItemPayload): Promise<Response> {
  return apiClient.post('media/import', payload).then(r => r.data);
}
