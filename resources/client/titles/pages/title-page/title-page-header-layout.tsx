import {ReactNode} from 'react';

interface Props {
  name: ReactNode;
  poster?: ReactNode;
  description?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
}
export function TitlePageHeaderLayout({
  name,
  description,
  children,
  right,
  poster,
}: Props) {
  return (
    <div className="mb-24 items-center justify-between gap-24 lg:flex">
      {poster}
      <div className="flex-auto">
        {children}
        <h1 className="mb-12 text-4xl md:mb-8 md:text-5xl">{name}</h1>
        {description && (
          <div className="text-base font-normal">{description}</div>
        )}
      </div>
      {right}
    </div>
  );
}
