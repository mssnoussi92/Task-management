import { Task } from '../entities/task.entity';

export interface TaskRepositoryPort {
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  deleteById(id: string): Promise<void>;
}
