import {Trans} from '@ui/i18n/trans';
import React from 'react';
import {NewsArticle} from '@app/titles/models/news-article';

interface Props {
  article: NewsArticle;
}
export function NewsArticleByline({article}: Props) {
  return article.byline ? (
    <span className="whitespace-nowrap">
      <Trans message="By :name" values={{name: article.byline}} />
    </span>
  ) : null;
}
