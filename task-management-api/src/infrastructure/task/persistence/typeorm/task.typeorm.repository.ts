import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../../domain/task/entities/task.entity';
import { TaskRepositoryPort } from '../../../../domain/task/ports/task.repository.port';
import { TaskTypeOrmEntity } from './task.typeorm.entity';

@Injectable()
export class TaskTypeOrmRepository implements TaskRepositoryPort {
  constructor(
    @InjectRepository(TaskTypeOrmEntity)
    private readonly taskRepository: Repository<TaskTypeOrmEntity>,
  ) {}

  private toDomain(taskEntity: TaskTypeOrmEntity): Task {
    const task = new Task();
    task.id = taskEntity.id;
    task.title = taskEntity.title;
    task.description = taskEntity.description;
    task.status = taskEntity.status;
    task.dueDate = taskEntity.dueDate;
    task.createdAt = taskEntity.createdAt;
    task.updatedAt = taskEntity.updatedAt;
    return task;
  }

  private toPersistence(task: Task): TaskTypeOrmEntity {
    const taskEntity = new TaskTypeOrmEntity();
    taskEntity.id = task.id;
    taskEntity.title = task.title;
    taskEntity.description = task.description;
    taskEntity.status = task.status;
    taskEntity.dueDate = task.dueDate;
    return taskEntity;
  }

  async save(task: Task): Promise<Task> {
    const taskEntity = this.toPersistence(task);
    const savedTask = await this.taskRepository.save(taskEntity);
    return this.toDomain(savedTask);
  }

  async findById(id: string): Promise<Task | null> {
    const taskEntity = await this.taskRepository.findOne({ where: { id } });
    return taskEntity ? this.toDomain(taskEntity) : null;
  }

  async findAll(options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    status?: string;
    search?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      status,
      search,
    } = options;

    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const order =
      sortOrder && ['ASC', 'DESC'].includes(sortOrder.toUpperCase())
        ? sortOrder.toUpperCase()
        : 'ASC';

    query
      .orderBy(`task.${sortBy}`, order as 'ASC' | 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [tasks, total] = await query.getManyAndCount();

    return {
      data: tasks.map((task) => this.toDomain(task)),
      total,
      page,
      limit,
    };
  }

  async deleteById(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
