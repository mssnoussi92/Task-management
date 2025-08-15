import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../domain/task/entities/task-status.enum';

export class TaskDto {
  @ApiProperty({
    description: 'The unique identifier of the task.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the task.',
    example: 'Complete the project report',
  })
  title: string;

  @ApiProperty({
    description: 'A detailed description of the task.',
    example: 'The project report needs to be completed by the end of the week.',
  })
  description: string;

  @ApiProperty({
    enum: TaskStatus,
    description: 'The current status of the task.',
    example: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'The due date of the task.',
    example: '2024-08-20T10:00:00.000Z',
  })
  dueDate: Date;

  @ApiProperty({
    description: 'The date and time when the task was created.',
    example: '2024-08-15T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the task was last updated.',
    example: '2024-08-15T12:00:00.000Z',
  })
  updatedAt: Date;
}
