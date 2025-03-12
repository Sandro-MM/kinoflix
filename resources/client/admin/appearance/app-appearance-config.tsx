import {
  IAppearanceConfig,
  MenuSectionConfig,
  SeoSettingsSectionConfig,
} from '@common/admin/appearance/types/appearance-editor-config';
import {message} from '@ui/i18n/message';
import {lazyAdminRoute} from '@common/admin/routes/lazy-admin-route';

export const AppAppearanceConfig: IAppearanceConfig = {
  preview: {
    defaultRoute: '/',
    navigationRoutes: ['/'],
  },
  sections: {
    'landing-page': {
      label: message('Landing Page'),
      position: 1,
      previewRoute: 'landing',
      routes: [
        {
          path: 'landing-page',
          lazy: () => lazyAdminRoute('LandingPageAppearanceForm'),
          children: [
            {
              index: true,
              lazy: () => lazyAdminRoute('LandingPageSectionGeneral'),
            },
            {
              path: 'action-buttons',
              lazy: () => lazyAdminRoute('LandingPageSectionActionButtons'),
            },
            {
              path: 'primary-features',
              lazy: () => lazyAdminRoute('LandingPageSectionPrimaryFeatures'),
            },
            {
              path: 'secondary-features',
              lazy: () => lazyAdminRoute('LandingPageSecondaryFeatures'),
            },
          ],
        },
      ],
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          'sidebar-primary',
          'sidebar-secondary',
          'mobile-bottom',
          'landing-page-navbar',
          'landing-page-footer',
        ],
        availableRoutes: [
          '/lists',
          '/watchlist',
          '/admin/channels',
          '/admin/comments',
        ],
      } as MenuSectionConfig,
    },
    // @ts-ignore
    'seo-settings': {
      config: {
        pages: [
          {
            key: 'title-page',
            label: message('Title page'),
          },
          {
            key: 'season-page',
            label: message('Season page'),
          },
          {
            key: 'episode-page',
            label: message('Episode page'),
          },
          {
            key: 'watch-page',
            label: message('Watch page'),
          },
          {
            key: 'person-page',
            label: message('Person page'),
          },
          {
            key: 'landing-page',
            label: message('Landing page'),
          },
          {
            key: 'news-article-page',
            label: message('News article page'),
          },
          {
            key: 'channel-page',
            label: message('Channel page'),
          },
        ],
      } as SeoSettingsSectionConfig,
    },
  },
};
