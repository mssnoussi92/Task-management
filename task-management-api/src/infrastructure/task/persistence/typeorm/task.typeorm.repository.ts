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

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks.map((task) => this.toDomain(task));
  }

  async deleteById(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
