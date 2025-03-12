import {DynamicHomepage} from '@common/ui/other/dynamic-homepage';
import {LandingPage} from '@app/landing-page/landing-page';
import React from 'react';
import {useSettings} from '@ui/settings/use-settings';
import {HomepageChannelPage} from '@app/channels/homepage-channel-page';
import {useAuth} from '@common/auth/use-auth';

export function Homepage() {
  const {homepage} = useSettings();
  const {user} = useAuth();

  // if user is logged in or homepage is a channel, show the channel page
  if (
    homepage?.type?.startsWith('channel') ||
    (homepage?.type?.startsWith('landing') && user)
  ) {
    return <HomepageChannelPage />;
  }

  return <DynamicHomepage homepageResolver={() => <LandingPage />} />;
}
