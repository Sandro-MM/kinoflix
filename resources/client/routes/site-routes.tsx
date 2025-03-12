import {RouteObject} from 'react-router';
import {authGuard} from '@common/auth/guards/auth-route';

const lazyRoute = async (
  cmp: keyof typeof import('@app/routes/site-routes.lazy'),
) => {
  const exports = await import('@app/routes/site-routes.lazy');
  return {
    Component: exports[cmp],
  };
};

export const siteRoutes: RouteObject[] = [
  {
    loader: () => authGuard({permission: 'titles.view', requireLogin: false}),
    children: [
      {
        index: true,
        lazy: () => lazyRoute('Homepage'),
      },
      {
        path: 'landing',
        lazy: () => lazyRoute('LandingPage'),
      },
      {
        path: 'search',
        lazy: () => lazyRoute('SearchPage'),
      },
      {
        path: 'search/:query',
        lazy: () => lazyRoute('SearchPage'),
      },
      // Watch
      {
        path: 'watch/:videoId',
        lazy: () => lazyRoute('WatchPage'),
      },
      // Titles
      {
        path: 'titles/:titleId/:titleSlug',
        lazy: () => lazyRoute('TitlePage'),
      },
      {
        path: 'titles/:titleId/:titleSlug/videos',
        lazy: () => lazyRoute('TitleVideosPage'),
      },
      {
        path: 'titles/:titleId/:titleSlug/images',
        lazy: () => lazyRoute('TitleImagesPage'),
      },
      {
        path: 'titles/:titleId/:titleSlug/full-credits',
        lazy: () => lazyRoute('TitleFullCreditsPage'),
      },
      {
        path: 'titles/:titleId/:titleSlug/season/:season',
        lazy: () => lazyRoute('SeasonPage'),
      },
      {
        path: 'titles/:titleId/:titleSlug/season/:season/episode/:episode',
        lazy: () => lazyRoute('EpisodePage'),
      },
      {
        path: 'titles/:titleId/:titleSlug/season/:season/episode/:episode/full-credits',
        lazy: () => lazyRoute('EpisodeFullCreditsPage'),
      },
      {
        path: 'titles/:titleId/:titleSlug/season/:season/episode/:episode/videos',
        lazy: () => lazyRoute('EpisodeVideosPage'),
      },
      // People
      {
        path: 'people/:personId',
        lazy: () => lazyRoute('PersonPage'),
      },
      {
        path: 'people/:personId/:personSlug',
        lazy: () => lazyRoute('PersonPage'),
      },
      // News
      {
        path: 'news/:articleId',
        lazy: () => lazyRoute('NewsArticlePage'),
      },
      // Profile page
      {
        path: 'user/:userId/:slug',
        lazy: () => lazyRoute('UserProfilePage'),
        children: [
          {
            index: true,
            lazy: () => lazyRoute('ProfileListsPanel'),
          },
          {
            path: 'lists',
            lazy: () => lazyRoute('ProfileListsPanel'),
          },
          {
            path: 'ratings',
            lazy: () => lazyRoute('ProfileRatingsPanel'),
          },
          {
            path: 'reviews',
            lazy: () => lazyRoute('ProfileReviewsPanel'),
          },
          {
            path: 'comments',
            lazy: () => lazyRoute('ProfileCommentsPanel'),
          },
          {
            path: 'followers',
            lazy: () => lazyRoute('ProfileFollowersPanel'),
          },
          {
            path: 'followed-users',
            lazy: () => lazyRoute('ProfileFollowedUsersPanel'),
          },
        ],
      },
      {
        path: 'user/:userId/:slug/:tab',
        lazy: () => lazyRoute('UserProfilePage'),
      },
      // User Lists
      {
        path: 'lists',
        loader: () => authGuard(),
        lazy: () => lazyRoute('UserListsIndexPage'),
      },
      {
        path: 'lists/new',
        loader: () => authGuard(),
        lazy: () => lazyRoute('SiteCreateUserListPage'),
      },
      {
        path: 'lists/:slugOrId',
        lazy: () => lazyRoute('ListChannelPage'),
      },
      {
        path: 'lists/:slugOrId/edit',
        loader: () => authGuard(),
        lazy: () => lazyRoute('SiteEditUserListPage'),
      },

      // Channels
      {
        path: ':slugOrId',
        lazy: () => lazyRoute('ChannelPage'),
      },
      {
        path: 'channel/:slugOrId',
        lazy: () => lazyRoute('ChannelPage'),
      },
      {
        path: ':slugOrId/:restriction',
        lazy: () => lazyRoute('ChannelPage'),
      },
      {
        path: 'channel/:slugOrId/:restriction',
        lazy: () => lazyRoute('ChannelPage'),
      },
    ],
  },
];
