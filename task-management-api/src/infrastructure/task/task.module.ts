import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from '../../domain/task/services/task.service';
import { TaskRepositoryPort } from '../../domain/task/ports/task.repository.port';
import { TaskTypeOrmEntity } from './persistence/typeorm/task.typeorm.entity';
import { TaskTypeOrmRepository } from './persistence/typeorm/task.typeorm.repository';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskTypeOrmEntity])],
  providers: [
    TaskService,
    {
      provide: 'TaskRepositoryPort',
      useClass: TaskTypeOrmRepository,
    },
  ],
  exports: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
