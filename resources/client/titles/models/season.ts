import {PersonCredit, Title} from './title';
import {Video} from '@app/titles/models/video';

export const SEASON_MODEL = 'season';

export interface Season {
  id: number;
  model_type: typeof SEASON_MODEL;
  poster: string;
  number: number;
  title?: Title;
  title_id: number;
  release_date: string;
  credits: PersonCredit[];
  episodes_count: number;
  primary_video?: Video;
}
