import {useMutation} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import {apiClient, queryClient} from '@common/http/query-client';
import {toast} from '@ui/toast/toast';
import {useTrans} from '@ui/i18n/use-trans';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {message} from '@ui/i18n/message';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Channel} from '@common/channels/channel';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {CreateChannelPayload} from '@common/admin/channels/requests/use-create-channel';

interface Response extends BackendResponse {
  channel: Channel;
}

export function useCreateList(form: UseFormReturn<CreateChannelPayload>) {
  const {trans} = useTrans();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: CreateChannelPayload) => createList(payload),
    onSuccess: async response => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('channel'),
      });
      toast(trans(message('List created')));
      navigate(`../${response.channel.id}/edit`, {
        replace: true,
        relative: 'path',
      });
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createList(payload: CreateChannelPayload) {
  return apiClient.post<Response>('channel', payload).then(r => r.data);
}
