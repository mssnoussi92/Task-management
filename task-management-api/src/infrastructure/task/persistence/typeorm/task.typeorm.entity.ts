import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from '../../../../domain/task/entities/task-status.enum';

@Entity({ name: 'tasks' })
export class TaskTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
