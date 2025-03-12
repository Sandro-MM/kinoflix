import {UserLink} from '@app/profile/user-link';
import {Tooltip} from '@ui/tooltip/tooltip';
import clsx from 'clsx';
import {ButtonBase} from '@ui/buttons/button-base';
import {OpenInNewIcon} from '@ui/icons/material/OpenInNew';
import {RemoteFavicon} from '@common/ui/other/remote-favicon';

interface Props {
  links?: UserLink[];
  className?: string;
}
export function ProfileLinks({links, className}: Props) {
  if (!links?.length) return null;

  if (links.length === 1) {
    return (
      <a
        className="mt-24 flex items-center gap-6 transition-colors hover:text-primary max-md:justify-center md:mt-12"
        href={links[0].url}
      >
        <OpenInNewIcon className="text-muted" size="sm" />
        <span className="capitalize">{links[0].title}</span>
      </a>
    );
  }

  return (
    <div className={clsx('flex items-center', className)}>
      {links.map(link => (
        <Tooltip label={link.title} key={link.url}>
          <ButtonBase
            elementType="a"
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            <RemoteFavicon url={link.url} alt={link.title} size="w-20 h-20" />
          </ButtonBase>
        </Tooltip>
      ))}
    </div>
  );
}
