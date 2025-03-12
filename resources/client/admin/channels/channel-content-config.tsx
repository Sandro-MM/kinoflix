import {message} from '@ui/i18n/message';
import {
  MOVIE_MODEL,
  SERIES_MODEL,
  Title,
  TITLE_MODEL,
} from '@app/titles/models/title';
import {NEWS_ARTICLE_MODEL, NewsArticle} from '@app/titles/models/news-article';
import {Channel, CHANNEL_MODEL} from '@common/channels/channel';
import {ChannelContentConfig} from '@common/admin/channels/channel-editor/channel-content-config';
import {Person, PERSON_MODEL} from '@app/titles/models/person';
import {GridViewIcon} from '@ui/icons/material/GridView';
import {ViewWeekIcon} from '@ui/icons/material/ViewWeek';
import {ViewListIcon} from '@ui/icons/material/ViewList';

export enum Sort {
  popular = 'popularity:desc',
  recent = 'created_at:desc',
  attachDate = 'channelables.created_at:desc',
  rating = 'rating:desc',
  curated = 'channelables.order:asc',
  name = 'name:asc',
  birthdayDesc = 'birth_date:desc',
  birthdayAsc = 'birth_date:asc',
  budget = 'budget:desc',
  revenue = 'revenue:desc',
}
export enum Layout {
  grid = 'grid',
  landscapeGrid = 'landscapeGrid',
  list = 'list',
  news = 'news',
  carousel = 'carousel',
  landscapeCarousel = 'landscapeCarousel',
  slider = 'slider',
}

enum Auto {
  latestVideos = 'latestVideos',
  mostPopular = 'mostPopular',
  topRated = 'topRated',
  upcoming = 'upcoming',
  nowPlaying = 'nowPlaying',
  airingToday = 'airingToday',
  airingThisWeek = 'airingThisWeek',
  trendingPeople = 'trendingPeople',
  discover = 'discover',
}

enum Restrictions {
  genre = 'genre',
  keyword = 'keyword',
  productionCountry = 'productionCountry',
}

const contentModels: ChannelContentConfig['models'] = {
  [MOVIE_MODEL]: {
    label: message('Movies'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.rating,
      Sort.budget,
      Sort.revenue,
    ],
    layoutMethods: [
      Layout.grid,
      Layout.landscapeGrid,
      Layout.list,
      Layout.carousel,
      Layout.landscapeCarousel,
      Layout.slider,
    ],
    autoUpdateMethods: [
      Auto.latestVideos,
      Auto.mostPopular,
      Auto.topRated,
      Auto.upcoming,
      Auto.nowPlaying,
      Auto.discover,
    ],
    restrictions: [
      Restrictions.genre,
      Restrictions.keyword,
      Restrictions.productionCountry,
    ],
  },
  [SERIES_MODEL]: {
    label: message('TV series'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.rating,
      Sort.budget,
      Sort.revenue,
    ],
    layoutMethods: [
      Layout.grid,
      Layout.landscapeGrid,
      Layout.list,
      Layout.carousel,
      Layout.landscapeCarousel,
      Layout.slider,
    ],
    autoUpdateMethods: [
      Auto.latestVideos,
      Auto.mostPopular,
      Auto.topRated,
      Auto.airingThisWeek,
      Auto.airingToday,
      Auto.discover,
    ],
    restrictions: [
      Restrictions.genre,
      Restrictions.keyword,
      Restrictions.productionCountry,
    ],
  },
  [TITLE_MODEL]: {
    label: message('Titles (movies and series)'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.rating,
      Sort.budget,
      Sort.revenue,
    ],
    layoutMethods: [
      Layout.grid,
      Layout.landscapeGrid,
      Layout.list,
      Layout.carousel,
      Layout.landscapeCarousel,
      Layout.slider,
    ],
    autoUpdateMethods: [Auto.latestVideos],
    restrictions: [
      Restrictions.genre,
      Restrictions.keyword,
      Restrictions.productionCountry,
    ],
  },
  [NEWS_ARTICLE_MODEL]: {
    label: message('News articles'),
    sortMethods: [Sort.recent],
    layoutMethods: [Layout.news, Layout.landscapeCarousel, Layout.list],
  },
  [PERSON_MODEL]: {
    label: message('People'),
    sortMethods: [
      Sort.popular,
      Sort.recent,
      Sort.name,
      Sort.birthdayDesc,
      Sort.birthdayAsc,
    ],
    layoutMethods: [Layout.grid, Layout.list, Layout.carousel],
    autoUpdateMethods: [Auto.trendingPeople],
  },
  [CHANNEL_MODEL]: {
    label: message('Channels'),
    sortMethods: [],
    layoutMethods: [Layout.list],
  },
};

const contentSortingMethods: Record<
  Sort,
  ChannelContentConfig['sortingMethods']['any']
> = {
  [Sort.popular]: {
    label: message('Most popular first'),
  },
  [Sort.recent]: {
    label: message('Recently created items first'),
  },
  [Sort.rating]: {
    label: message('Highest rated first'),
  },
  [Sort.curated]: {
    label: message('Curated (reorder below)'),
    contentTypes: ['manual'],
  },
  [Sort.attachDate]: {
    label: message('Items recently added to channel first'),
    contentTypes: ['manual'],
  },
  [Sort.name]: {
    label: message('Name (A-Z)'),
    contentTypes: ['manual'],
  },
  [Sort.birthdayDesc]: {
    label: message('Youngest first'),
  },
  [Sort.birthdayAsc]: {
    label: message('Oldest first'),
  },
  [Sort.budget]: {
    label: message('Biggest budget first'),
  },
  [Sort.revenue]: {
    label: message('Biggest revenue first'),
  },
};

const contentLayoutMethods: Record<
  Layout,
  ChannelContentConfig['layoutMethods']['any']
> = {
  [Layout.grid]: {
    label: message('Grid'),
    icon: <GridViewIcon />,
  },
  [Layout.landscapeGrid]: {
    label: message('Landscape'),
    icon: <ViewWeekIcon />,
  },
  [Layout.list]: {
    label: message('List'),
    icon: <ViewListIcon />,
  },
  [Layout.carousel]: {
    label: message('Carousel (portrait)'),
  },
  [Layout.landscapeCarousel]: {
    label: message('Carousel (landscape)'),
  },
  [Layout.slider]: {
    label: message('Slider'),
  },
  [Layout.news]: {
    label: message('News'),
  },
};

const contentAutoUpdateMethods: Record<
  Auto,
  ChannelContentConfig['autoUpdateMethods']['any']
> = {
  [Auto.discover]: {
    label: message('Discover (TMDB only)'),
    providers: ['tmdb'],
  },
  [Auto.mostPopular]: {
    label: message('Most popular'),
    providers: ['tmdb', 'local'],
  },
  [Auto.topRated]: {
    label: message('Top rated'),
    providers: ['tmdb', 'local'],
  },
  [Auto.upcoming]: {
    label: message('Upcoming'),
    providers: ['tmdb', 'local'],
  },
  [Auto.nowPlaying]: {
    label: message('In theaters'),
    providers: ['tmdb', 'local'],
  },
  [Auto.airingToday]: {
    label: message('Airing today'),
    providers: ['tmdb', 'local'],
  },
  [Auto.airingThisWeek]: {
    label: message('Airing this week'),
    providers: ['tmdb', 'local'],
  },
  [Auto.trendingPeople]: {
    label: message('Trending people'),
    providers: ['tmdb', 'local'],
  },
  [Auto.latestVideos]: {
    label: message('Most recently published videos'),
    providers: ['local'],
  },
};
export const channelContentConfig: ChannelContentConfig = {
  models: contentModels,
  sortingMethods: contentSortingMethods,
  layoutMethods: contentLayoutMethods,
  autoUpdateMethods: contentAutoUpdateMethods,
  userSelectableLayouts: [Layout.grid, Layout.landscapeGrid, Layout.list],
  restrictions: {
    [Restrictions.genre]: {
      label: message('Genre'),
      value: Restrictions.genre,
    },
    [Restrictions.keyword]: {
      label: message('Keyword'),
      value: Restrictions.keyword,
    },
    [Restrictions.productionCountry]: {
      label: message('Production country'),
      value: Restrictions.productionCountry,
    },
  },
};

export type ChannelContentModel = (Title | NewsArticle | Person | Channel) & {
  channelable_id?: number;
  channelable_order?: number;
};
