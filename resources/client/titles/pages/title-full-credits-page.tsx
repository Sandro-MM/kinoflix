import React, {Fragment} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {TitlePageHeaderImage} from '@app/titles/pages/title-page/title-page-header-image';
import {TitlePageHeader} from '@app/titles/pages/title-page/title-page-header';
import {SitePageLayout} from '@app/site-page-layout';
import {GetTitleResponse, useTitle} from '@app/titles/requests/use-title';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';
import {TitleCreditsGrid} from '@app/titles/pages/title-page/title-credits-grid/title-credits-grid';

export function TitleFullCreditsPage() {
  const query = useTitle('titleCreditsPage');

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
  data: GetTitleResponse;
}
function PageContent({
  data: {title, credits: groupedCredits = {}},
}: PageContentProps) {
  return (
    <div>
      <TitlePageHeaderImage title={title} />
      <div className="container mx-auto mt-24 px-14 md:mt-40 md:px-24">
        <TitlePageHeader title={title} showPoster />
        <div className="mt-48 @container">
          <SiteSectionHeading headingType="h2" className="mb-40">
            <Trans message="Full cast and crew" />
          </SiteSectionHeading>
          {Object.entries(groupedCredits).map(([department, credits]) => (
            <div key={department}>
              <h3 className="mb-16 text-2xl font-bold capitalize">
                <Trans message={department} />
              </h3>
              <TitleCreditsGrid credits={credits} className="mb-68" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
