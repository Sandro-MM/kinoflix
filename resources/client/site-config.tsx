import {SiteConfigContextValue} from '@common/core/settings/site-config-context';
import {message} from '@ui/i18n/message';
import generalTopImage from '@app/admin/verts/general_top.jpg';
import titleTopImage from '@app/admin/verts/title_top.jpg';
import personTopImage from '@app/admin/verts/person_top.jpg';
import generalBottomImage from '@app/admin/verts/general_bottom.jpg';
import watchTop from '@app/admin/verts/watch_top.jpg';
import {slugifyString} from '@ui/utils/string/slugify-string';

function getUserProfileLink(user: {id: number | string; name: string}): string {
  return `/user/${user.id}/${slugifyString(user.name)}`;
}

export const SiteConfig: Partial<SiteConfigContextValue> = {
  homepage: {
    options: [{label: message('Landing page'), value: 'landingPage'}],
  },
  auth: {
    redirectUri: '/',
    adminRedirectUri: '/admin',
    getUserProfileLink,
  },
  admin: {
    channelsDocsLink:
      'https://support.vebto.com/hc/articles/35/38/220/channels',
    ads: [
      {
        image: generalTopImage,
        slot: 'ads.general_top',
        description: message(
          'Appears at the top of most pages. Best size <= 150px height or responsive.',
        ),
      },
      {
        image: generalBottomImage,
        slot: 'ads.general_bottom',
        description: message(
          'Appears at the bottom of most pages. Best size <= 150px height or responsive.',
        ),
      },
      {
        image: titleTopImage,
        slot: 'ads.title_top',
        description: message(
          'Appears in title page only (after plot summary). Best size <= 850px width or responsive.',
        ),
      },
      {
        image: personTopImage,
        slot: 'ads.person_top',
        description: message(
          'Appears in person page only (after biography). Best size <= 850px width or responsive.',
        ),
      },
      {
        image: watchTop,
        slot: 'ads.watch_top',
        description: message(
          'Appears in watch page only (below video player). Best size is as wide as possible or responsive.',
        ),
      },
    ],
  },
};
