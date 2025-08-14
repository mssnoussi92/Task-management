import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../../../domain/task/services/task.service';
import { CreateTaskDto } from '../../../common/dtos/create-task.dto';
import { UpdateTaskDto } from '../../../common/dtos/update-task.dto';
import { GetTasksDto } from '../../../common/dtos/get-tasks.dto';
import { Task } from '../../../domain/task/entities/task.entity';
import { TaskStatus } from '../../../domain/task/entities/task-status.enum';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
      };
      const result: Task = {
        id: '1',
        ...createTaskDto,
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTaskService.create.mockResolvedValue(result);

      expect(await controller.create(createTaskDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          dueDate: new Date(),
          status: TaskStatus.TODO,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const getTasksDto: GetTasksDto = { page: 1, limit: 10 };
      mockTaskService.findAll.mockResolvedValue({
        data: result,
        total: result.length,
        page: 1,
        limit: 10,
      });

      expect(await controller.findAll(getTasksDto)).toEqual({
        data: result,
        total: result.length,
        page: 1,
        limit: 10,
      });
      expect(service.findAll).toHaveBeenCalledWith(getTasksDto);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result: Task = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTaskService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Title' };
      const result: Task = {
        id: '1',
        title: 'Updated Title',
        description: 'Test Description',
        dueDate: new Date(),
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTaskService.update.mockResolvedValue(result);

      expect(await controller.update('1', updateTaskDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith('1', updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      mockTaskService.remove.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
