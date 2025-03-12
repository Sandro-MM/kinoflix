import {User} from '@ui/types/user';
import {NormalizedModel} from '@ui/types/normalized-model';

export interface Review {
  id: number;
  score: number;
  reviewable_id: number;
  reviewable_type: string;
  user_id: number;
  user?: User;
  current_user_feedback?: boolean;
  current_user_reported?: boolean;
  helpful_count: number;
  not_helpful_count: number;
  reviewable: NormalizedModel;
  title?: string;
  body?: string;
  reports_count?: number;
  model_type: string;
  created_at: string;
  updated_at: string;
}
