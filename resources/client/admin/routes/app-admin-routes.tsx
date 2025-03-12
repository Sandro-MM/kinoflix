import {Navigate, RouteObject} from 'react-router';
import React from 'react';
import {lazyAdminRoute} from '@common/admin/routes/lazy-admin-route';

export const appAdminRoutes: RouteObject[] = [
  // Reports
  {
    path: '',
    lazy: () => lazyAdminRoute('MtdbAdminReportPage'),
    children: [
      {index: true, lazy: () => lazyAdminRoute('AdminInsightsReport')},
      {path: 'plays', lazy: () => lazyAdminRoute('AdminInsightsReport')},
      {path: 'visitors', lazy: () => lazyAdminRoute('AdminVisitorsReport')},
    ],
  },
  // Channels
  {
    path: 'channels',
    lazy: () => lazyAdminRoute('ChannelsDatatablePage'),
  },
  {
    path: 'channels/new',
    lazy: () => lazyAdminRoute('CreateChannelPage'),
  },
  {
    path: 'channels/:slugOrId/edit',
    lazy: () => lazyAdminRoute('EditChannelPage'),
  },

  // User lists
  {
    path: 'lists',
    lazy: () => lazyAdminRoute('ListsDatatablePage'),
  },
  {
    path: 'lists/new',
    lazy: () => lazyAdminRoute('CreateUserListPage'),
  },
  {
    path: 'lists/:slugOrId/edit',
    lazy: () => lazyAdminRoute('EditUserListPage'),
  },

  // People
  {
    path: 'people',
    lazy: () => lazyAdminRoute('PeopleDatatablePage'),
  },
  {
    path: 'people/new',
    lazy: () => lazyAdminRoute('CreatePersonPage'),
  },
  {
    path: 'people/:personId/edit',
    lazy: () => lazyAdminRoute('UpdatePersonPage'),
    children: [
      {
        index: true,
        element: <Navigate to="primary-facts" replace />,
      },
      {
        path: 'primary-facts',
        lazy: () => lazyAdminRoute('PersonPrimaryFactsForm'),
      },
      {
        path: 'credits',
        lazy: () => lazyAdminRoute('PersonCreditsEditor'),
      },
    ],
  },

  // Titles
  {
    path: 'titles',
    lazy: () => lazyAdminRoute('TitlesDatatablePage'),
  },
  {
    path: 'titles/new',
    lazy: () => lazyAdminRoute('TitlePrimaryFactsForm'),
  },
  {
    path: 'videos/:videoId/insights',
    lazy: () => lazyAdminRoute('VideoInsightsPage'),
  },
  {
    path: 'titles/:titleId/insights',
    lazy: () => lazyAdminRoute('TitleInsightsPage'),
  },
  {
    path: 'titles/:titleId/insights/seasons/:season',
    lazy: () => lazyAdminRoute('SeasonInsightsPage'),
  },
  {
    path: 'titles/:titleId/insights/seasons/:season/episodes/:episode',
    lazy: () => lazyAdminRoute('EpisodeInsightsPage'),
  },
  {
    path: 'titles/:titleId/edit',
    element: <Navigate to="primary-facts" replace={true} />,
  },
  {
    path: 'titles/:titleId/edit',
    lazy: () => lazyAdminRoute('EditTitlePage'),
    children: [
      {
        index: true,
        lazy: () => lazyAdminRoute('TitlePrimaryFactsForm'),
      },
      {
        path: 'primary-facts',
        lazy: () => lazyAdminRoute('TitlePrimaryFactsForm'),
      },
      {
        path: 'reviews',
        lazy: () => lazyAdminRoute('TitleReviewsEditor'),
      },
      {
        path: 'comments',
        lazy: () => lazyAdminRoute('TitleCommentsEditor'),
      },
      {
        path: 'images',
        lazy: () => lazyAdminRoute('TitleImagesEditor'),
      },
      {
        path: 'genres',
        lazy: () => lazyAdminRoute('TitleGenresEditor'),
      },
      {
        path: 'keywords',
        lazy: () => lazyAdminRoute('TitleKeywordsEditor'),
      },
      {
        path: 'countries',
        lazy: () => lazyAdminRoute('TitleCountriesEditor'),
      },
      {
        path: 'cast',
        lazy: () => lazyAdminRoute('TitleCastEditor'),
      },
      {
        path: 'crew',
        lazy: () => lazyAdminRoute('TitleCrewEditor'),
      },
      {
        path: 'videos',
        lazy: () => lazyAdminRoute('TitleVideosEditor'),
      },
      {
        path: 'videos/seasons/:season',
        lazy: () => lazyAdminRoute('TitleVideosEditor'),
      },
      {
        path: 'videos/seasons/:season/episodes/:episode',
        lazy: () => lazyAdminRoute('TitleVideosEditor'),
      },

      // SEASONS
      {
        path: 'seasons',
        lazy: () => lazyAdminRoute('TitleSeasonsEditor'),
      },
      {
        path: 'seasons/:season',
        children: [
          {
            index: true,
            element: <Navigate to="episodes" replace />,
          },
          {
            path: 'Episodes',
            lazy: () => lazyAdminRoute('SeasonEditorEpisodeList'),
          },
          {
            path: 'cast',
            lazy: () => lazyAdminRoute('SeasonCastEditor'),
          },
          {
            path: 'crew',
            lazy: () => lazyAdminRoute('SeasonCrewEditor'),
          },
        ],
      },

      // EPISODES
      {
        path: 'seasons/:season/episodes/new',
        lazy: () => lazyAdminRoute('EpisodePrimaryFactsForm'),
      },
      {
        path: 'seasons/:season/episodes/:episode',
        children: [
          {
            index: true,
            element: <Navigate to="primary-facts" replace />,
          },
          {
            path: 'primary-facts',
            lazy: () => lazyAdminRoute('EpisodePrimaryFactsForm'),
          },
          {
            path: 'cast',
            lazy: () => lazyAdminRoute('EpisodeCastEditor'),
          },
          {
            path: 'crew',
            lazy: () => lazyAdminRoute('EpisodeCrewEditor'),
          },
        ],
      },
    ],
  },

  // Video editor with no season or episode selected
  {
    path: 'titles/:titleId/edit/videos/new',
    lazy: () => lazyAdminRoute('CreateVideoPage'),
  },

  {
    path: 'titles/:titleId/edit/videos/edit/:videoId',
    lazy: () => lazyAdminRoute('EditVideoPage'),
  },

  // Video editor with season selected
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/new',
    lazy: () => lazyAdminRoute('CreateVideoPage'),
  },
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/edit/:videoId',
    lazy: () => lazyAdminRoute('EditVideoPage'),
  },

  // Video editor with season and episode selected
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/episodes/:episode/new',
    lazy: () => lazyAdminRoute('CreateVideoPage'),
  },
  {
    path: 'titles/:titleId/edit/videos/seasons/:season/episodes/:episode/edit/:videoId',
    lazy: () => lazyAdminRoute('EditVideoPage'),
  },

  // News articles
  {
    path: 'news',
    lazy: () => lazyAdminRoute('NewsDatatablePage'),
  },
  {
    path: 'news/add',
    lazy: () => lazyAdminRoute('CreateNewsArticlePage'),
  },
  {
    path: 'news/:articleId/edit',
    lazy: () => lazyAdminRoute('EditNewsArticlePage'),
  },

  // Comments
  {
    path: 'comments',
    lazy: () => lazyAdminRoute('CommentsDatatablePage'),
  },

  // Reviews
  {
    path: 'reviews',
    lazy: () => lazyAdminRoute('ReviewsDatatablePage'),
  },

  // Videos
  {
    path: 'videos',
    lazy: () => lazyAdminRoute('VideosDatatablePage'),
  },
  {
    path: 'videos/new',
    lazy: () => lazyAdminRoute('CreateVideoPage'),
  },
  {
    path: 'videos/:videoId/edit',
    lazy: () => lazyAdminRoute('EditVideoPage'),
  },

  // Title tags
  {
    path: 'keywords',
    lazy: () => lazyAdminRoute('TitleKeywordsDatatablePage'),
  },
  {
    path: 'genres',
    lazy: () => lazyAdminRoute('TitleGenresDatatablePage'),
  },
];
