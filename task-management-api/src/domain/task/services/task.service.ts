import { Injectable, Inject } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../entities/task-status.enum';
import type { TaskRepositoryPort } from '../ports/task.repository.port';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepositoryPort')
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async create(createTaskDto: {
    title: string;
    description: string;
    dueDate: Date;
  }): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.dueDate = createTaskDto.dueDate;
    task.status = TaskStatus.TODO;
    return this.taskRepository.save(task);
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    Object.assign(task, updates);
    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    return this.taskRepository.deleteById(id);
  }
}
