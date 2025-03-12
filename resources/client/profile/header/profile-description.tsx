import {UserProfile} from '@app/profile/user-profile';
import clsx from 'clsx';

interface Props {
  profile?: UserProfile;
  className?: string;
}
export function ProfileDescription({profile, className}: Props) {
  if (!profile) return null;
  return (
    <div className={clsx('text-sm', className)}>
      {profile.description && (
        <p className="rounded text-secondary whitespace-nowrap overflow-hidden overflow-ellipsis">
          {profile.description}
        </p>
      )}
      {profile.city || profile.country ? (
        <div className="flex items-center gap-24 justify-between mt-4">
          {(profile.city || profile.country) && (
            <div className="rounded text-secondary w-max">
              {profile.city}
              {profile.city && ','} {profile.country}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
