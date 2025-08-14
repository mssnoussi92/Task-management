import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { TaskStatus } from '../../domain/task/entities/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({ required: false, enum: TaskStatus })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
