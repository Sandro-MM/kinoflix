import {User} from '@ui/types/user';
import {NormalizedModel} from '@ui/types/normalized-model';
import {VotableModel} from '@common/votes/votable-model';

export interface Comment extends VotableModel {
  content: string;
  user_id: number;
  user?: User;
  depth: number;
  deleted: boolean;
  commentable_id: number;
  commentable_type: string;
  commentable?: NormalizedModel;
  children: Comment[];
  position?: number;
  created_at?: string;
}
