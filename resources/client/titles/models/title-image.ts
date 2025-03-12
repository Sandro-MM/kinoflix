export interface TitleImage {
  id: number;
  url: string;
  type: 'backdrop' | 'poster';
  source: 'local' | 'tmdb';
}
