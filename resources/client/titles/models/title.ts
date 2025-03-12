import {Video} from './video';
import {TitleImage} from './title-image';
import {Episode} from './episode';
import {Season} from './season';
import {Review} from './review';
import {Genre} from '@app/titles/models/genre';
import {Keyword} from '@app/titles/models/keyword';
import {ProductionCountry} from '@app/titles/models/production-country';
import {Person} from '@app/titles/models/person';

export interface EpisodeCredit extends Episode {
  pivot: TitleCreditPivot;
}

export interface TitleCredit extends Person {
  pivot: TitleCreditPivot;
}

export interface PersonCredit extends Title {
  credited_episode_count?: number;
  episodes: EpisodeCredit[];
  pivot: TitleCreditPivot;
}

export interface TitleCreditPivot {
  id: number;
  job: string;
  department: 'directing' | 'writing' | 'actors' | 'creators';
  character: string;
}

export const TITLE_MODEL = 'title';
export const MOVIE_MODEL = 'movie';
export const SERIES_MODEL = 'series';

export interface Title {
  id: number;
  name: string;
  original_title: string;
  model_type: typeof TITLE_MODEL;
  is_series: boolean;
  status: 'released' | 'upcoming' | 'ongoing' | 'ended';
  description: string;
  tagline: string;
  runtime: number;
  rating: number;
  budget: number;
  poster?: string;
  backdrop: string;
  revenue: number;
  views: number;
  popularity: number;
  seasons_count: number;
  release_date: string;
  year: number;
  genres: Genre[];
  keywords: Keyword[];
  production_countries: ProductionCountry[];
  videos: Video[];
  all_videos?: Video[];
  primary_video: Video;
  primary_video_count?: number;
  certification?: string;
  images: TitleImage[];
  season?: Season;
  seasons?: Season[];
  reviews?: Review[];
  language: string;
  updated_at?: string;
}
