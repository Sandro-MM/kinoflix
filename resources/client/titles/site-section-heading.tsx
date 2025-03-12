import {IconButton} from '@ui/buttons/icon-button';
import {Link} from 'react-router';
import {KeyboardArrowRightIcon} from '@ui/icons/material/KeyboardArrowRight';
import {ReactNode} from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  titleAppend?: ReactNode;
  link?: string;
  fontSize?: string;
  fontWeight?: string;
  margin?: string;
  headingType?: 'h1' | 'h2' | 'div';
  className?: string;
  description?: ReactNode;
  descriptionFontSize?: string;
  actions?: ReactNode;
  hideBorder?: boolean;
  wrap?: boolean;
}
export function SiteSectionHeading({
  children,
  titleAppend,
  link,
  fontSize = 'text-2xl md:text-3xl',
  fontWeight = 'font-bold',
  margin = 'mb-20',
  className,
  headingType: HeadingType = 'h2',
  description,
  descriptionFontSize = 'text-base',
  actions,
  hideBorder,
  wrap = false,
}: Props) {
  const title = link ? (
    <Link
      to={link}
      className="rounded outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  ) : (
    children
  );

  return (
    <section className={clsx(className, margin)}>
      <div
        className={clsx(
          'flex items-center gap-x-44 gap-y-14 max-md:overflow-x-auto',
          wrap && 'flex-wrap',
        )}
      >
        <div className="flex-auto">
          <div
            className={clsx(
              'relative flex items-center gap-4',
              !hideBorder &&
                'pl-14 before:absolute before:left-0 before:h-5/6 before:w-4 before:rounded before:bg-primary',
            )}
          >
            <HeadingType className={clsx(fontSize, fontWeight)}>
              {title}
            </HeadingType>
            {titleAppend && (
              <span className="pt-4 text-base text-muted">{titleAppend}</span>
            )}
            {link && (
              <IconButton
                elementType={Link}
                to={link}
                size="sm"
                iconSize="lg"
                className="mt-4 max-md:hidden"
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex flex-shrink-0 items-center gap-4">{actions}</div>
        )}
      </div>
      {description && (
        <div className={clsx('mt-6', descriptionFontSize)}>{description}</div>
      )}
    </section>
  );
}
