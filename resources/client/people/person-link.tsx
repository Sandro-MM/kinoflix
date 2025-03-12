import {Link, LinkProps} from 'react-router';
import clsx from 'clsx';
import React, {ReactNode, useMemo} from 'react';
import {slugifyString} from '@ui/utils/string/slugify-string';
import {Person} from '@app/titles/models/person';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

interface Props extends Omit<LinkProps, 'to'> {
  person: Person;
  className?: string;
  children?: ReactNode;
  color?: 'primary' | 'inherit';
}
export function PersonLink({
  person,
  className,
  children,
  color = 'inherit',
  ...linkProps
}: Props) {
  const finalUri = useMemo(() => {
    return getPersonLink(person);
  }, [person]);

  return (
    <Link
      {...linkProps}
      className={clsx(
        color === 'primary'
          ? 'text-primary hover:text-primary-dark'
          : 'text-inherit',
        'overflow-x-hidden overflow-ellipsis outline-none transition-colors hover:underline focus-visible:underline',
        className,
      )}
      to={finalUri}
    >
      {children ?? person.name}
    </Link>
  );
}

export function getPersonLink(
  person: Person,
  {absolute}: {absolute?: boolean} = {},
): string {
  let link = `/people/${person.id}/${slugifyString(person.name)}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
