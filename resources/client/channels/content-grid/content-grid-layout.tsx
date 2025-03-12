import {ReactNode} from 'react';
import clsx from 'clsx';

export interface ContentGridProps {
  className?: string;
  children: ReactNode;
  variant?: 'portrait' | 'landscape';
  gridCols?: string;
}
export function ContentGridLayout({
  children,
  className,
  variant,
  gridCols = 'grid-cols-[repeat(var(--nVisibleItems),minmax(0,1fr))]',
}: ContentGridProps) {
  return (
    <div
      className={clsx(
        'grid gap-24',
        gridCols,
        className,
        variant === 'landscape'
          ? 'content-grid-landscape'
          : 'content-grid-portrait'
      )}
    >
      {children}
    </div>
  );
}
