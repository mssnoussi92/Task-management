import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepositoryPort } from '../ports/task.repository.port';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../entities/task-status.enum';

describe('TaskService', () => {
  let service: TaskService;
  let repository: TaskRepositoryPort;

  const mockTaskRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: 'TaskRepositoryPort',
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<TaskRepositoryPort>('TaskRepositoryPort');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
      };
      const task = new Task();
      Object.assign(task, createTaskDto, { status: TaskStatus.TODO });

      mockTaskRepository.save.mockResolvedValue(task);

      const result = await service.create(createTaskDto);

      expect(result).toEqual(task);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Task',
          status: TaskStatus.TODO,
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should find a task by id', async () => {
      const task = new Task();
      task.id = '1';
      mockTaskRepository.findById.mockResolvedValue(task);

      const result = await service.findOne('1');

      expect(result).toEqual(task);
      expect(repository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('should find all tasks', async () => {
      const tasks = [new Task()];
      mockTaskRepository.findAll.mockResolvedValue({ data: tasks, total: 1 });

      const result = await service.findAll({});

      expect(result.data).toEqual(tasks);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const task = new Task();
      task.id = '1';
      task.title = 'Old Title';

      const updates = { title: 'New Title' };

      mockTaskRepository.findById.mockResolvedValue(task);
      mockTaskRepository.save.mockResolvedValue({ ...task, ...updates });

      const result = await service.update('1', updates);

      expect(result.title).toEqual('New Title');
      expect(repository.findById).toHaveBeenCalledWith('1');
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(updates),
      );
    });

    it('should throw an error if task not found', async () => {
      mockTaskRepository.findById.mockResolvedValue(null);
      await expect(service.update('1', { title: 'New Title' })).rejects.toThrow(
        'Task not found',
      );
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      mockTaskRepository.deleteById.mockResolvedValue(undefined);
      await service.remove('1');
      expect(repository.deleteById).toHaveBeenCalledWith('1');
    });
  });
});
