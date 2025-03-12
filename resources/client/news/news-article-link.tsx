import {Link, LinkProps} from 'react-router';
import clsx from 'clsx';
import React, {ReactNode, useMemo} from 'react';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';
import {NewsArticle} from '@app/titles/models/news-article';

interface Props extends Omit<LinkProps, 'to'> {
  article: NewsArticle;
  className?: string;
  children?: ReactNode;
  color?: 'primary' | 'inherit';
}
export function NewsArticleLink({
  article,
  className,
  children,
  color = 'inherit',
  ...linkProps
}: Props) {
  const finalUri = useMemo(() => {
    return getNewsArticleLink(article);
  }, [article]);

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
      {children ?? article.title}
    </Link>
  );
}

export function getNewsArticleLink(
  article: NewsArticle,
  {absolute}: {absolute?: boolean} = {},
): string {
  let link = `/news/${article.slug}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
