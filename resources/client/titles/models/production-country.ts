export const PRODUCTION_COUNTRY_MODEL = 'production_country';

export interface ProductionCountry {
  id: number;
  name: string;
  display_name: string;
  updated_at: string;
  created_at: string;
  model_type: typeof PRODUCTION_COUNTRY_MODEL;
}
