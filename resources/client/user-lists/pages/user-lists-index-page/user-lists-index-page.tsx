import React from 'react';
import {PageStatus} from '@common/http/page-status';
import {SitePageLayout} from '@app/site-page-layout';
import {Trans} from '@ui/i18n/trans';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Link} from 'react-router';
import {Button} from '@ui/buttons/button';
import {Channel} from '@common/channels/channel';
import {UserListIndexItem} from '@app/user-lists/pages/user-lists-index-page/user-list-index-item';
import {useProfileLists} from '@app/profile/requests/use-profile-lists';
import {StaticPageTitle} from '@common/seo/static-page-title';
import {useAuth} from '@common/auth/use-auth';
import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';
import {InfiniteScrollSentinel} from '@common/ui/infinite-scroll/infinite-scroll-sentinel';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import todoImage from '@app/admin/lists/todo.svg';
import {SvgImage} from '@ui/images/svg-image';

export function UserListsIndexPage() {
  const query = useProfileLists();

  const content = query.data ? (
    <PageContent query={query} />
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );

  return (
    <SitePageLayout>
      <StaticPageTitle>
        <Trans message="Your lists" />
      </StaticPageTitle>
      <div className="container mx-auto mt-48 px-24">
        <header>
          <SiteSectionHeading
            headingType="h1"
            margin="mb-34"
            actions={
              <Button
                variant="flat"
                color="primary"
                elementType={Link}
                to="new"
              >
                <Trans message="New list" />
              </Button>
            }
          >
            <Trans message="My lists" />
          </SiteSectionHeading>
        </header>
        {content}
      </div>
    </SitePageLayout>
  );
}

interface PageContentProps {
  query: UseInfiniteDataResult<Channel>;
}
function PageContent({query}: PageContentProps) {
  const {user} = useAuth();

  if (query.noResults) {
    return (
      <IllustratedMessage
        className="mt-80"
        image={<SvgImage src={todoImage} />}
        title={<Trans message="You have not created any lists yet." />}
      />
    );
  }

  return (
    <div>
      {query.items.map(list => (
        <UserListIndexItem list={list} key={list.id} user={user!} />
      ))}
      <InfiniteScrollSentinel query={query} />
    </div>
  );
}
