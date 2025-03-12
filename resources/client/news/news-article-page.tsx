import React, {Fragment} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {SitePageLayout} from '@app/site-page-layout';
import {
  GetNewsArticleResponse,
  useNewsArticle,
} from '@app/admin/news/requests/use-news-article';
import {NewsArticle} from '@app/titles/models/news-article';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {NewsArticleImage} from '@app/news/news-article-image';
import {NewsArticleLink} from '@app/news/news-article-link';
import {NewsArticleByline} from '@app/news/news-article-byline';
import {NewsArticleSourceLink} from '@app/news/news-article-source-link';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Trans} from '@ui/i18n/trans';

export function NewsArticlePage() {
  const query = useNewsArticle('newsArticlePage');

  const content = query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent data={query.data} />
    </Fragment>
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );

  return <SitePageLayout>{content}</SitePageLayout>;
}

interface PageContentProps {
  data: GetNewsArticleResponse;
}
function PageContent({data: {article, related}}: PageContentProps) {
  return (
    <div className="container mx-auto mt-14 items-start gap-40 px-14 md:mt-40 md:px-24 lg:flex">
      <main className="mb-24 flex-auto rounded border p-16">
        <h1 className="mb-24 text-3xl md:text-4xl">{article.title}</h1>
        <div className="items-start gap-16 md:flex">
          <NewsArticleImage
            article={article}
            size="w-184 h-184"
            className="max-md:mb-24"
          />
          <div
            className="prose text dark:prose-invert"
            dangerouslySetInnerHTML={{__html: article.body}}
          />
        </div>
        <BulletSeparatedItems className="mt-24 text-sm text-muted">
          <FormattedDate date={article.created_at} />
          {article.byline ? <NewsArticleByline article={article} /> : null}
          {article.source ? <NewsArticleSourceLink article={article} /> : null}
        </BulletSeparatedItems>
      </main>
      <OtherNews articles={related} />
    </div>
  );
}

interface OtherNewsProps {
  articles: NewsArticle[];
}
function OtherNews({articles}: OtherNewsProps) {
  return (
    <div className="w-full max-w-full flex-shrink-0 lg:w-400">
      <h2 className="mb-14 text-2xl">
        <Trans message="Other news" />
      </h2>
      {articles.map(article => (
        <div
          key={article.id}
          className="mb-14 flex items-center gap-14 rounded border pr-14"
        >
          <NewsArticleImage article={article} size="w-80 h-80" lazy={false} />
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold">
              <NewsArticleLink article={article} />
            </h3>
            <BulletSeparatedItems className="mt-6 text-sm text-muted">
              <FormattedDate date={article.created_at} />
              <NewsArticleByline article={article} />
            </BulletSeparatedItems>
          </div>
        </div>
      ))}
    </div>
  );
}
