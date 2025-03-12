import {PersonCredit} from './title';

export const PERSON_MODEL = 'person';

export interface Person {
  id: number;
  name: string;
  poster?: string;
  known_for?: string;
  gender?: string;
  birth_date: string;
  death_date: string;
  birth_place: string;
  primary_credit?: PersonCredit;
  views?: number;
  popularity?: number;
  updated_at?: string;
  description: string;
  model_type: typeof PERSON_MODEL;
}
