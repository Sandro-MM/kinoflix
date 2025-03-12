export const GENRE_MODEL = 'genre';

export interface Genre {
  id: number;
  name: string;
  display_name: string;
  updated_at: string;
  created_at: string;
  model_type: typeof GENRE_MODEL;
}
