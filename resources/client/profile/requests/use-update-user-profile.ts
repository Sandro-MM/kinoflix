import {useMutation} from '@tanstack/react-query';
import {useTrans} from '@ui/i18n/use-trans';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import {apiClient, queryClient} from '@common/http/query-client';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useAuth} from '@common/auth/use-auth';
import {UserLink} from '@app/profile/user-link';
import {userProfileQueryKey} from '@app/profile/requests/use-user-profile';
import {User} from '@ui/types/user';

interface Response extends BackendResponse {
  user: User;
}

export interface UpdateProfilePayload {
  user: {
    image?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
  };
  profile: {
    city?: string;
    country?: string;
    description?: string;
  };
  links: UserLink[];
}

export function useUpdateUserProfile(
  form: UseFormReturn<UpdateProfilePayload>,
) {
  const {user} = useAuth();
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({
          queryKey: userProfileQueryKey(user.id),
        });
      }
      toast(trans(message('Profile updated')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateProfile(payload: UpdateProfilePayload): Promise<Response> {
  return apiClient.put('user-profile/me', payload).then(r => r.data);
}
