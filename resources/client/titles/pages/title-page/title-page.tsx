import {GetTitleResponse, useTitle} from '@app/titles/requests/use-title';
import {PageStatus} from '@common/http/page-status';
import {PageMetaTags} from '@common/http/page-meta-tags';
import React, {Fragment} from 'react';
import {TitlePageMainContent} from '@app/titles/pages/title-page/title-page-main-content';
import {TitlePageHeader} from '@app/titles/pages/title-page/title-page-header';
import {TitlePageHeaderImage} from '@app/titles/pages/title-page/title-page-header-image';
import {TitlePageAside} from '@app/titles/pages/title-page/title-page-aside';
import {SitePageLayout} from '@app/site-page-layout';

export function TitlePage() {
  const query = useTitle('titlePage');

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
function PageContent({data}: PageContentProps) {
  return (
    <Fragment>
      <TitlePageHeaderImage title={data.title} />
      <div className="container mx-auto mt-24 px-14 md:mt-40 md:px-24">
        <div className="items-start gap-54 md:flex">
          <TitlePageAside data={data} className="max-lg:hidden" />
          <div className="flex-auto">
            <TitlePageHeader title={data.title} />
            <TitlePageMainContent data={data} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
