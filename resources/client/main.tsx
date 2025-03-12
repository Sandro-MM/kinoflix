import './app.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {CommonProvider} from '@common/core/common-provider';
import * as Sentry from '@sentry/react';
import {ignoredSentryErrors} from '@common/errors/ignored-sentry-errors';
import {UserLink} from '@app/profile/user-link';
import {UserProfile} from '@app/profile/user-profile';
import {LandingPageContent} from '@app/landing-page/landing-page-content';
import {Title} from '@app/titles/models/title';
import {GetTitleResponse} from '@app/titles/requests/use-title';
import {appRouter} from '@app/app-router';
import {GetSeasonResponse} from '@app/seasons/requests/use-season';
import {GetChannelResponse} from '@common/channels/requests/use-channel';
import {Product} from '@common/billing/product';
import {GetEpisodeResponse} from '@app/episodes/requests/use-episode';
import {GetPersonResponse} from '@app/people/requests/use-person';
import {SearchResponse} from '@app/search/requests/use-search-results';
import {GetNewsArticleResponse} from '@app/admin/news/requests/use-news-article';
import {UseWatchPageVideoResponse} from '@app/videos/requests/use-watch-page-video';
import {FetchCustomPageResponse} from '@common/custom-page/use-custom-page';
import {TitlePageSections} from '@app/titles/pages/title-page/sections/title-page-sections';
import {BaseBackendUser} from '@common/auth/base-backend-user';
import {BaseBackendSettings} from '@common/core/settings/base-backend-settings';
import {BaseBackendBootstrapData} from '@common/core/base-backend-bootstrap-data';
import {rootEl} from '@ui/root-el';
import {getBootstrapData} from '@ui/bootstrap-data/bootstrap-data-store';

declare module '@common/http/value-lists' {
  interface FetchValueListsResponse {
    titleFilterLanguages: {value: string; name: string}[];
    productionCountries: {value: string; name: string}[];
    genres: {value: string; name: string}[];
    keywords: {value: string; name: string}[];
    titleFilterAgeRatings: {value: string; name: string}[];
    tmdbLanguages: {name: string; code: string}[];
    tmdbDepartments: {department: string; jobs: string[]}[];
  }
}

declare module '@ui/bootstrap-data/bootstrap-data' {
  interface BootstrapData extends BaseBackendBootstrapData {
    loaders?: {
      titlePage?: GetTitleResponse;
      titleCreditsPage?: GetTitleResponse;
      title?: GetTitleResponse;
      editTitlePage?: GetTitleResponse;
      seasonPage?: GetSeasonResponse;
      season?: GetSeasonResponse;
      editSeasonPage?: GetSeasonResponse;
      episode?: GetEpisodeResponse;
      episodePage?: GetEpisodeResponse;
      episodeCreditsPage?: GetEpisodeResponse;
      channelPage?: GetChannelResponse;
      editChannelPage?: GetChannelResponse;
      editUserListPage?: GetChannelResponse;
      personPage?: GetPersonResponse;
      editPersonPage?: GetPersonResponse;
      searchPage?: SearchResponse;
      searchAutocomplete?: SearchResponse;
      newsArticlePage?: GetNewsArticleResponse;
      watchPage?: UseWatchPageVideoResponse;
      customPage?: FetchCustomPageResponse;
      landingPage?: {
        products: Product[];
        trendingTitles: Title[];
      };
    };
  }
}

declare module '@ui/settings/settings' {
  interface Settings extends BaseBackendSettings {
    homepage?: {
      type?: string;
      value?: string;
      pricing?: boolean;
      appearance: LandingPageContent;
      trending?: boolean;
    };
    ads?: {
      general_top?: string;
      general_bottom?: string;
      title_top?: string;
      person_top?: string;
      watch_top?: string;
      disable?: boolean;
    };
    tmdb_is_setup: boolean;
    streaming: {
      default_sort: string;
      show_header_play: boolean;
      prefer_full: boolean;
      qualities: string[];
      show_video_selector: boolean;
      video_panel_content: string;
    };
    comments?: {
      per_video: boolean;
    };
    titles: {
      video_panel_mode?: 'hide' | 'carousel' | 'table';
      enable_reviews?: boolean;
      enable_comments?: boolean;
    };
    title_page?: {
      sections: (typeof TitlePageSections)[number][];
    };
    content: {
      title_provider?: string;
      people_provider?: string;
      search_provider?: string;
      force_season_update?: boolean;
      automate_filmography?: boolean;
    };
    tmdb?: {
      language?: string;
      includeAdult?: boolean;
    };
  }
}

declare module '@ui/types/user' {
  interface User extends BaseBackendUser {
    username?: string;
    profile?: UserProfile;
    links?: UserLink[];
    lists_count?: number;
    is_pro?: boolean;
  }
}

const data = getBootstrapData();
const sentryDsn = data.settings.logging.sentry_public;
if (sentryDsn && import.meta.env.PROD) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.2,
    ignoreErrors: ignoredSentryErrors,
    release: data.sentry_release,
  });
}

createRoot(rootEl).render(<CommonProvider router={appRouter} />);
