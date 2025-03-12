export const KEYWORD_MODEL = 'keyword';

export interface Keyword {
  id: number;
  name: string;
  display_name: string;
  updated_at: string;
  created_at: string;
  model_type: typeof KEYWORD_MODEL;
}
