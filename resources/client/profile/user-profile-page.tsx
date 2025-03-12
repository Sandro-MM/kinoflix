import {useUserProfile} from '@app/profile/requests/use-user-profile';
import React, {Fragment, useContext} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {SitePageLayout} from '@app/site-page-layout';
import {User} from '@ui/types/user';
import {Tabs} from '@ui/tabs/tabs';
import {TabList} from '@ui/tabs/tab-list';
import {Tab} from '@ui/tabs/tab';
import {Trans} from '@ui/i18n/trans';
import {Link, Outlet, useLocation} from 'react-router';
import {SiteConfigContext} from '@common/core/settings/site-config-context';
import {message} from '@ui/i18n/message';
import {ProfilePageHeader} from '@app/profile/header/profile-page-header';

const PageTabs = [
  {uri: 'lists', label: message('Lists')},
  {uri: 'ratings', label: message('Ratings')},
  {uri: 'reviews', label: message('Reviews')},
  {uri: 'comments', label: message('Comments')},
  {uri: 'followers', label: message('Followers')},
  {uri: 'followed-users', label: message('Following')},
];

export function UserProfilePage() {
  const query = useUserProfile();

  const content = query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent user={query.data.user} />
    </Fragment>
  ) : (
    <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
  );

  return <SitePageLayout>{content}</SitePageLayout>;
}

interface PageContentProps {
  user: User;
}
function PageContent({user}: PageContentProps) {
  return (
    <div className="container mx-auto mt-24 px-14 md:mt-40 md:px-24">
      <ProfilePageHeader user={user} />
      <ProfileTabs user={user} />
    </div>
  );
}

interface ProfileTabsProps {
  user: User;
}
function ProfileTabs({user}: ProfileTabsProps) {
  const {
    auth: {getUserProfileLink},
  } = useContext(SiteConfigContext);
  const profileLink = getUserProfileLink!(user);

  const {pathname} = useLocation();
  const tabName = pathname.split('/').pop();
  let selectedTab = PageTabs.findIndex(tab => tab.uri === tabName);
  if (selectedTab === -1) {
    selectedTab = 0;
  }

  return (
    <Tabs className="mt-34" selectedTab={selectedTab}>
      <TabList>
        {PageTabs.map(tab => (
          <Tab
            key={tab.uri}
            width="min-w-132"
            elementType={Link}
            to={`${profileLink}/${tab.uri}`}
            replace
          >
            <Trans {...tab.label} />
          </Tab>
        ))}
      </TabList>
      <div className="mt-24">
        <Outlet />
      </div>
    </Tabs>
  );
}
