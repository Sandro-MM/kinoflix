import {Link, LinkProps} from 'react-router';
import clsx from 'clsx';
import React, {ReactNode} from 'react';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

export interface BaseMediaLinkProps extends Omit<LinkProps, 'to' | 'title'> {
  link: string;
  className?: string;
  children?: ReactNode;
  color?: 'primary' | 'inherit';
  displayContents?: boolean;
}
export function BaseMediaLink({
  link,
  className,
  children,
  color = 'inherit',
  displayContents,
  ...linkProps
}: BaseMediaLinkProps) {
  const baseClassName = displayContents
    ? 'contents'
    : clsx(
        color === 'primary'
          ? 'text-primary hover:text-primary-dark'
          : 'text-inherit',
        'hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors',
      );
  return (
    <Link {...linkProps} className={clsx(baseClassName, className)} to={link}>
      {children}
    </Link>
  );
}

export function getBaseMediaLink(
  link: string,
  {absolute}: {absolute?: boolean} = {},
): string {
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
