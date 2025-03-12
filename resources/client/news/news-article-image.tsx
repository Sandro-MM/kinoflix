import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import clsx from 'clsx';
import {NewsArticle} from '@app/titles/models/news-article';
import {NewsArticleLink} from '@app/news/news-article-link';
import {NewspaperIcon} from '@ui/icons/material/Newspaper';

interface Props {
  article: NewsArticle;
  className?: string;
  size?: string;
  lazy?: boolean;
}
export function NewsArticleImage({
  article,
  className,
  size,
  lazy = true,
}: Props) {
  const {trans} = useTrans();
  const src = article.image;

  const imageClassName = clsx(
    className,
    size,
    'object-cover bg-fg-base/4 rounded',
    !src ? 'flex items-center justify-center' : 'block',
  );

  const image = src ? (
    <img
      className={imageClassName}
      draggable={false}
      loading={lazy ? 'lazy' : 'eager'}
      src={src}
      alt={trans(message('Image for :name', {values: {name: article.title}}))}
    />
  ) : (
    <span className={imageClassName}>
      <NewspaperIcon className="max-w-[60%] text-divider" size="text-6xl" />
    </span>
  );

  return (
    <NewsArticleLink article={article} className="group relative flex-shrink-0">
      {image}
      <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
    </NewsArticleLink>
  );
}
