import { User } from './user.model';
export interface UsersResponse {
  total_count: number;
  items: User[];
}
