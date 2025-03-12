import {ChannelContentProps} from '@app/channels/channel-content';
import React from 'react';
import {NewsArticle} from '@app/titles/models/news-article';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {ChannelHeader} from '@app/channels/channel-header/channel-header';
import {NewsArticleImage} from '@app/news/news-article-image';
import {NewsArticleLink} from '@app/news/news-article-link';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {NewsArticleSourceLink} from '@app/news/news-article-source-link';
import {NewsArticleByline} from '@app/news/news-article-byline';
import {useChannelContent} from '@common/channels/requests/use-channel-content';
import {Channel, ChannelContentItem} from '@common/channels/channel';
import {
  PaginationControls,
  PaginationControlsType,
} from '@common/ui/navigation/pagination-controls';

export function ChannelContentNews({
  channel,
  isNested,
}: ChannelContentProps<NewsArticle>) {
  const query = useChannelContent<ChannelContentItem<NewsArticle>>(
    channel,
    null,
    {
      isNested,
    },
  );

  return (
    <div>
      <ChannelHeader channel={channel as Channel} isNested={isNested} />
      {!isNested && (
        <PaginationControls
          pagination={query.data}
          type={channel.config.paginationType as PaginationControlsType}
          className="mb-34"
        />
      )}
      <div className="flex gap-34">
        <div className="w-240 flex-shrink-0">
          {query.data?.data
            .slice(0, 3)
            .map(article => (
              <LeftColArticle
                key={article.id}
                article={article}
                className="mb-14"
              />
            ))}
        </div>
        <div className="flex-auto">
          {query.data?.data.slice(3, 12).map(article => (
            <div key={article.id} className="mb-12 flex items-center gap-14">
              <NewsArticleImage article={article} size="w-84 h-84" />
              <div className="flex-auto">
                <NewsArticleLink article={article} className="font-semibold" />
                <BulletSeparatedItems className="text-sm">
                  <FormattedDate date={article.created_at} />
                  <NewsArticleByline article={article} />
                  <NewsArticleSourceLink article={article} />
                </BulletSeparatedItems>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isNested && (
        <PaginationControls
          pagination={query.data}
          type={channel.config.paginationType as PaginationControlsType}
          className="mt-34"
          scrollToTop
        />
      )}
    </div>
  );
}

interface LeftColArticleProps {
  article: NewsArticle;
  className?: string;
}
function LeftColArticle({article, className}: LeftColArticleProps) {
  return (
    <div className={className}>
      <NewsArticleImage article={article} size="aspect-video w-full" />
      <NewsArticleLink
        article={article}
        className="mt-10 block text-sm font-semibold"
      />
      <div className="mt-8 text-xs text-muted">
        <NewsArticleByline article={article} />
        <NewsArticleSourceLink article={article} className="mt-4" />
      </div>
    </div>
  );
}
