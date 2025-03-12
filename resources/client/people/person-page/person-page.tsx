import {PageStatus} from '@common/http/page-status';
import {PageMetaTags} from '@common/http/page-meta-tags';
import React, {Fragment} from 'react';
import {SitePageLayout} from '@app/site-page-layout';
import {GetPersonResponse, usePerson} from '@app/people/requests/use-person';
import {Person} from '@app/titles/models/person';
import {Trans} from '@ui/i18n/trans';
import {TitlePageHeaderLayout} from '@app/titles/pages/title-page/title-page-header-layout';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {PersonPageAside} from '@app/people/person-page/person-page-aside';
import {ContentGridLayout} from '@app/channels/content-grid/content-grid-layout';
import {PersonCredit} from '@app/titles/models/title';
import {TitlePortraitGridItem} from '@app/channels/content-grid/title-grid-item';
import {PersonPageCredits} from '@app/people/person-page/person-page-credits';
import {CharacterOrJob} from '@app/people/person-page/character-or-job';
import {AdHost} from '@common/admin/ads/ad-host';
import {TruncatedDescription} from '@common/ui/other/truncated-description';

export function PersonPage() {
  const query = usePerson('personPage');

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
  data: GetPersonResponse;
}
function PageContent({data}: PageContentProps) {
  const {person, knownFor} = data;
  return (
    <Fragment>
      <div className="container mx-auto mt-14 px-14 md:mt-40 md:px-24">
        <div className="items-start gap-54 md:flex">
          <PersonPageAside data={data} />
          <main className="flex-auto @container max-md:mt-34">
            <TitlePageHeaderLayout name={person.name} />
            <Biography person={person} />
            <AdHost slot="person_top" className="pt-48" />
            <KnowForList items={knownFor} />
            <PersonPageCredits data={data} />
          </main>
        </div>
      </div>
    </Fragment>
  );
}

interface BiographyProps {
  person: Person;
}
function Biography({person}: BiographyProps) {
  if (!person.description) return null;
  return (
    <Fragment>
      <SiteSectionHeading fontSize="text-xl">
        <Trans message="Biography" />
      </SiteSectionHeading>
      <TruncatedDescription
        className="text-sm"
        description={person.description}
      />
    </Fragment>
  );
}

interface KnownForProps {
  items: PersonCredit[];
}
function KnowForList({items}: KnownForProps) {
  if (!items?.length) return null;
  return (
    <div className="mt-34">
      <SiteSectionHeading fontSize="text-xl">
        <Trans message="Known for" />
      </SiteSectionHeading>
      <ContentGridLayout variant="portrait">
        {items.slice(0, 4).map(item => (
          <TitlePortraitGridItem
            key={item.id}
            item={item}
            description={
              <CharacterOrJob className="text-muted" credit={item} />
            }
          />
        ))}
      </ContentGridLayout>
    </div>
  );
}
