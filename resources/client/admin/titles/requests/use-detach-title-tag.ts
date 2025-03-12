import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/http/show-http-error-toast';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {useParams} from 'react-router';
import {Keyword} from '@app/titles/models/keyword';
import {Genre} from '@app/titles/models/genre';
import {ProductionCountry} from '@app/titles/models/production-country';

interface Response extends BackendResponse {}

export type TitleTag = Keyword | Genre | ProductionCountry;

export function useDetachTitleTag(tag: TitleTag) {
  const {titleId} = useParams();
  return useMutation({
    mutationFn: () => detachTag(titleId!, tag),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['titles', `${titleId}`]});
      toast(message('Tag detached'));
    },
    onError: r => showHttpErrorToast(r),
  });
}

function detachTag(titleId: number | string, tag: TitleTag): Promise<Response> {
  return apiClient
    .delete(`titles/${titleId}/tags/${tag.model_type}/${tag.id}`)
    .then(r => r.data);
}
