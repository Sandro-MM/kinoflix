import {TITLE_MODEL} from '@app/titles/models/title';
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {NEWS_ARTICLE_MODEL} from '@app/titles/models/news-article';
import {ContentGridProps} from '@app/channels/content-grid/content-grid-layout';
import {Person, PERSON_MODEL} from '@app/titles/models/person';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import {PersonLink} from '@app/people/person-link';
import {PersonAge} from '@app/people/person-age';
import {NewsArticleGridItem} from '@app/news/news-article-grid-item';
import {
  TitleLandscapeGridItem,
  TitlePortraitGridItem,
} from '@app/channels/content-grid/title-grid-item';

interface Props {
  item: ChannelContentModel;
  variant?: ContentGridProps['variant'];
}
export function ChannelContentGridItem({item, variant}: Props) {
  switch (item.model_type) {
    case TITLE_MODEL:
      return variant === 'landscape' ? (
        <TitleLandscapeGridItem item={item} />
      ) : (
        <TitlePortraitGridItem item={item} />
      );
    case PERSON_MODEL:
      return <PersonGridItem item={item} />;
    case NEWS_ARTICLE_MODEL:
      return <NewsArticleGridItem article={item} />;
    default:
      return null;
  }
}

interface PersonGridItemProps {
  item: Person;
}
function PersonGridItem({item}: PersonGridItemProps) {
  return (
    <div>
      <PersonPoster person={item} srcSize="md" size="w-full" rounded />
      <div className="mt-10 text-center text-sm">
        <PersonLink person={item} className="block text-base font-medium" />
        <div>
          <PersonAge person={item} showRange />
        </div>
      </div>
    </div>
  );
}
