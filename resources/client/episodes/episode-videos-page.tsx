import React, {Fragment} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {TitlePageHeaderImage} from '@app/titles/pages/title-page/title-page-header-image';
import {Title} from '@app/titles/models/title';
import {VideoGrid} from '@app/titles/video-grid';
import {Trans} from '@ui/i18n/trans';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {SitePageLayout} from '@app/site-page-layout';
import {useEpisode} from '@app/episodes/requests/use-episode';
import {Episode} from '@app/titles/models/episode';
import {EpisodePageHeader} from '@app/episodes/episode-page-header';

export function EpisodeVideosPage() {
  const query = useEpisode('episodePage');

  const content = query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent title={query.data.title} episode={query.data.episode} />
    </Fragment>
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );

  return <SitePageLayout>{content}</SitePageLayout>;
}

interface PageContentProps {
  episode: Episode;
  title: Title;
}
function PageContent({episode, title}: PageContentProps) {
  return (
    <div>
      <TitlePageHeaderImage title={title} episode={episode} />
      <div className="container mx-auto mt-24 px-14 md:mt-40 md:px-24">
        <EpisodePageHeader title={title} episode={episode} showPoster />
        <VideoGrid
          videos={episode.videos}
          title={title}
          episode={episode}
          count={24}
          heading={
            <SiteSectionHeading>
              <Trans message="Video gallery" />
            </SiteSectionHeading>
          }
        />
      </div>
    </div>
  );
}
