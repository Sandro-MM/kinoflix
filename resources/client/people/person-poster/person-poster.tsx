import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import clsx from 'clsx';
import {Person} from '@app/titles/models/person';
import {PersonLink} from '@app/people/person-link';
import {ImageSize, useImageSrc} from '@app/images/use-image-src';
import {PersonIcon} from '@ui/icons/material/Person';

interface Props {
  person: Person;
  className?: string;
  size?: string;
  lazy?: boolean;
  srcSize?: ImageSize;
  rounded?: boolean;
}
export function PersonPoster({
  person,
  className,
  size,
  srcSize,
  lazy = true,
  rounded = false,
}: Props) {
  const {trans} = useTrans();
  const src = useImageSrc(person?.poster, {size: srcSize});

  const imageClassName = clsx(
    className,
    size,
    'bg-fg-base/4 object-cover',
    rounded ? 'aspect-square rounded-full' : 'aspect-poster rounded',
    !src ? 'flex items-center justify-center' : 'block',
  );

  const image = src ? (
    <img
      decoding="async"
      className={imageClassName}
      draggable={false}
      loading={lazy ? 'lazy' : 'eager'}
      src={src}
      alt={trans(
        message('Cover image for :name', {values: {name: person.name}}),
      )}
    />
  ) : (
    <span className={imageClassName}>
      <PersonIcon className="max-w-[60%] text-divider" size="text-5xl" />
    </span>
  );

  return (
    <PersonLink person={person} className="flex-shrink-0">
      {image}
    </PersonLink>
  );
}
