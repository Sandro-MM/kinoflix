export const NEWS_ARTICLE_MODEL = 'newsArticle';

export interface NewsArticle {
  id: number;
  title?: string;
  body: string;
  slug: string;
  image: string;
  byline?: string;
  source?: string;
  source_url?: string;
  model_type: typeof NEWS_ARTICLE_MODEL;
  created_at?: string;
  updated_at?: string;
}
