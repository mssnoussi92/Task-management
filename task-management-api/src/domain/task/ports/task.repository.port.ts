import { PaginatedResponse } from '../../../common/dtos/paginated-response.dto';
import { Task } from '../entities/task.entity';

export interface TaskRepositoryPort {
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAll(options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse>;
  deleteById(id: string): Promise<void>;
}
