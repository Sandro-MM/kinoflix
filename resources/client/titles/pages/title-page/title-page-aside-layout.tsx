import {Fragment, ReactElement, ReactNode} from 'react';
import clsx from 'clsx';

interface Props {
  poster: ReactElement;
  children: ReactNode;
  className?: string;
}
export function TitlePageAsideLayout({poster, children, className}: Props) {
  return (
    <div className={clsx('top-40 flex-shrink-0 md:sticky md:w-1/4', className)}>
      {poster}
      <div className="flex-auto max-md:ml-16 max-md:text-sm">{children}</div>
    </div>
  );
}

interface DetailItemProps {
  label: ReactNode;
  children: ReactNode;
}
export function DetailItem({label, children}: DetailItemProps) {
  return (
    <Fragment>
      <dt className="font-semibold">{label}</dt>
      <dl className="mb-12 md:mb-24">{children}</dl>
    </Fragment>
  );
}
