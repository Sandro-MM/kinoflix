import {ChipList} from '@ui/forms/input-field/chip-field/chip-list';
import {Chip} from '@ui/forms/input-field/chip-field/chip';
import {Link} from 'react-router';
import {TitlePageImageGrid} from '@app/titles/pages/title-page/sections/title-page-image-grid';
import {TitlePageCast} from '@app/titles/pages/title-page/sections/title-page-cast';
import {RelatedTitlesPanel} from '@app/titles/related-titles-panel';
import {TitlePageSeasonGrid} from '@app/titles/pages/title-page/sections/title-page-season-grid';
import {CompactCredits} from '@app/titles/compact-credits';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {getTitleLink} from '@app/titles/title-link';
import {getGenreLink} from '@app/titles/genre-link';
import {TitleNews} from '@app/titles/pages/title-page/sections/title-news/title-news';
import clsx from 'clsx';
import {TitlePageReviewList} from '@app/titles/pages/title-page/sections/title-page-review-list';
import {GetTitleResponse} from '@app/titles/requests/use-title';
import {TitlePageVideoGrid} from '@app/titles/pages/title-page/sections/title-page-video-grid';
import {useSettings} from '@ui/settings/use-settings';
import {useAuth} from '@common/auth/use-auth';
import {TitlePageEpisodeGrid} from '@app/titles/pages/title-page/sections/title-page-episode-grid';
import {TitlePageSections} from '@app/titles/pages/title-page/sections/title-page-sections';
import {Title} from '@app/titles/models/title';
import {AdHost} from '@common/admin/ads/ad-host';
import {TruncatedDescription} from '@common/ui/other/truncated-description';

interface Props {
  data: GetTitleResponse;
  className?: string;
}
export function TitlePageMainContent({data, className}: Props) {
  const {title, credits} = data;
  const {title_page} = useSettings();
  return (
    <main className={clsx(className, '@container')}>
      {title.genres?.length ? (
        <ChipList>
          {title.genres.map(genre => (
            <Chip
              className="capitalize"
              elementType={Link}
              to={getGenreLink(genre)}
              key={genre.id}
            >
              <Trans message={genre.display_name || genre.name} />
            </Chip>
          ))}
        </ChipList>
      ) : null}
      {title.tagline && (
        <blockquote className="mt-16">“{title.tagline}”</blockquote>
      )}
      <TruncatedDescription className="mt-16" description={title.description} />
      <CompactCredits credits={credits} />
      <AdHost slot="title_top" className="pt-48" />
      {title_page?.sections?.map(name => (
        <TitlePageSection key={name} name={name} title={title} data={data} />
      ))}
    </main>
  );
}

interface TitlePageSectionProps {
  title: Title;
  data: GetTitleResponse;
  name: (typeof TitlePageSections)[number];
}
function TitlePageSection({name, title, data}: TitlePageSectionProps) {
  const {titles} = useSettings();
  const {hasPermission} = useAuth();
  switch (name) {
    case 'episodes':
      return title.is_series ? (
        <TitlePageEpisodeGrid data={data} showSeasonSelector />
      ) : null;
    case 'seasons':
      return title.is_series ? <TitlePageSeasonGrid data={data} /> : null;
    case 'videos':
      return <TitlePageVideoGrid title={title} />;
    case 'images':
      return (
        <TitlePageImageGrid
          images={title.images}
          heading={
            <SiteSectionHeading link={`${getTitleLink(title)}/images`}>
              <Trans message="Images" />
            </SiteSectionHeading>
          }
        />
      );
    case 'reviews':
      return titles.enable_reviews && hasPermission('reviews.view') ? (
        <TitlePageReviewList title={title} />
      ) : null;
    case 'cast':
      return <TitlePageCast credits={data.credits?.actors} />;
    case 'news':
      return <TitleNews title={title} />;
    case 'related':
      return <RelatedTitlesPanel title={title} />;
  }
}
