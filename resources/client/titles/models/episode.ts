import {Video} from './video';
import {Title} from '@app/titles/models/title';

export const EPISODE_MODEL = 'episode';

export interface Episode {
  id: number;
  name: string;
  model_type: typeof EPISODE_MODEL;
  status: 'released' | 'upcoming';
  poster: string;
  runtime: number;
  popularity: number;
  rating: number;
  description: string;
  season_number: number;
  episode_number: number;
  title?: Title;
  title_id: number;
  release_date: string;
  year: number;
  videos?: Video[];
  primary_video: Video;
}
