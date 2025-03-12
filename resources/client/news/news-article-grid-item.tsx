import {NewsArticleImage} from '@app/news/news-article-image';
import {NewsArticleLink} from '@app/news/news-article-link';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {NewsArticle} from '@app/titles/models/news-article';

interface Props {
  article: NewsArticle;
}
export function NewsArticleGridItem({article}: Props) {
  return (
    <div className="items-start gap-14 lg:flex">
      <NewsArticleImage
        article={article}
        className="aspect-poster max-w-90 max-md:hidden"
      />
      <div className="min-w-0 overflow-hidden overflow-ellipsis text-base md:mt-24 lg:mt-6">
        <NewsArticleLink article={article} className="font-medium" />
        <BulletSeparatedItems className="mt-10 min-w-0 overflow-hidden overflow-ellipsis text-xs">
          <FormattedDate date={article.created_at} />
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {article.source}
          </div>
        </BulletSeparatedItems>
      </div>
    </div>
  );
}
