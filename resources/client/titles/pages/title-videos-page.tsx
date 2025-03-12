import React, {Fragment} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {TitlePageHeaderImage} from '@app/titles/pages/title-page/title-page-header-image';
import {Title} from '@app/titles/models/title';
import {VideoGrid} from '@app/titles/video-grid';
import {TitlePageHeader} from '@app/titles/pages/title-page/title-page-header';
import {Trans} from '@ui/i18n/trans';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {SitePageLayout} from '@app/site-page-layout';
import {useTitle} from '@app/titles/requests/use-title';

export function TitleVideosPage() {
  const query = useTitle('titlePage');

  const content = query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent title={query.data.title} />
    </Fragment>
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );

  return <SitePageLayout>{content}</SitePageLayout>;
}

interface PageContentProps {
  title: Title;
}
function PageContent({title}: PageContentProps) {
  return (
    <div>
      <TitlePageHeaderImage title={title} />
      <div className="container mx-auto mt-24 px-14 md:mt-40 md:px-24">
        <TitlePageHeader title={title} showPoster />
        <VideoGrid
          videos={title.videos}
          title={title}
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
