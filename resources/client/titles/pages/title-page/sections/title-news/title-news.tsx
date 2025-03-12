import {useTitleNews} from '@app/titles/pages/title-page/sections/title-news/use-title-news';
import React from 'react';
import {NewsArticleGridItem} from '@app/news/news-article-grid-item';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {Title} from '@app/titles/models/title';

interface Props {
  title: Title;
}
export function TitleNews({title}: Props) {
  const {data, isLoading} = useTitleNews(title.id);

  if (!isLoading && !data?.news_articles.length) {
    return null;
  }

  return (
    <section className="mt-48">
      <SiteSectionHeading>
        <Trans message="Related news" />
      </SiteSectionHeading>
      <div className="grid grid-cols-2 gap-24">
        {data?.news_articles.map(article => (
          <NewsArticleGridItem key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
