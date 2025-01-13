import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  private tasks: Task[] = [
    {
      id: 1,
      name: 'Lavar a louça',
      description: 'Lavara a louça do almoço',
      completed: false,
    },
  ];

  async get(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const tasks = await this.prisma.tasks.findMany({
      take: limit,
      skip: offset,
    });

    return tasks;
  }

  async find(id: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
      },
    });

    if (task?.title) return task;

    throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
  }

  async create(CreateTaskDto: CreateTaskDto) {
    const task = await this.prisma.tasks.create({
      data: CreateTaskDto,
    });

    return task;
  }

  async update(id: number, UpdateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
      },
    });

    if (!task) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }

    const newTask = await this.prisma.tasks.update({
      where: {
        id: id,
      },
      data: UpdateTaskDto,
    });

    return newTask;
  }

  async delete(id: number) {
    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
      },
    });

    if (!task) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.tasks.delete({
        where: {
          id: id,
        },
      });

      return {
        message: 'Tarefa deletada com sucesso',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Erro ao deletar tarefa', HttpStatus.BAD_REQUEST);
    }
  }
}
