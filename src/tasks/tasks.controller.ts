import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Patch,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  get() {
    return this.tasksService.get();
  }

  @Get('/:id')
  find(@Param('id', ParseIntPipe) id: number, @Query('limit') limit: string) {
    return this.tasksService.find(id, limit);
  }

  @Post('/create')
  create(@Body() CreateTaskDto: CreateTaskDto) {
    return this.tasksService.create(CreateTaskDto);
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateTaskDto: UpdateTaskDto,
  ) {
    return id;
  }

  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
