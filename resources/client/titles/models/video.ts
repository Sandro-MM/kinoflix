import {Title} from './title';
import {VotableModel} from '@common/votes/votable-model';
import {Episode} from '@app/titles/models/episode';

export const VIDEO_MODEL_TYPE = 'video';

export interface Video extends VotableModel {
  name: string;
  description?: string;
  src: string;
  type: 'video' | 'stream' | 'embed' | 'external';
  category: 'full' | 'trailer' | 'clip' | 'featurette' | 'teaser';
  thumbnail?: string;
  origin: 'local' | 'tmdb';
  quality: string;
  approved: boolean;
  title?: Title;
  episode?: Episode;
  user_id: number;
  season_num: number;
  episode_num: number;
  title_id: number;
  captions?: VideoCaption[];
  language?: string;
  updated_at?: string;
  created_at?: string;
  plays_count?: number;
  reports_count?: number;
  current_user_reported?: boolean;
  latest_play?: {
    time_watched?: number;
  };
  model_type: typeof VIDEO_MODEL_TYPE;
}

export interface VideoCaption {
  id: number;
  name: string;
  language: string;
  order: number;
  url: string;
}
