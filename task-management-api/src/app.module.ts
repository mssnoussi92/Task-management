import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './infrastructure/task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'password',
      database: 'task_management',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // BE CAREFUL: only for development, automatically creates schema
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
