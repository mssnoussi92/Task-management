import { Task } from '../../domain/task/entities/task.entity';

export interface PaginatedResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
}
