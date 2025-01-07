import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Lavar a louça',
      description: 'Lavara a louça do almoço',
      completed: false,
    },
  ];

  get() {
    return this.tasks;
  }

  find(id: number, limit: string) {
    return this.tasks.find((task) => task.id === id);
  }

  create(CreateTaskDto: CreateTaskDto) {
    return CreateTaskDto;
  }

  update(id: number, UpdateTaskDto: UpdateTaskDto) {
    return id;
  }

  delete(id: number) {
    return 'Ok';
  }
}
