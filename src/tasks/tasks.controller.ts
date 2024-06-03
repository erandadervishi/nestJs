/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param, Delete, Patch, Query, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);

    
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }


  @Post()
  createTask(
    @Body() createTaskDto: createTaskDto
  ): Promise<Task> {
     return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.tasksService.deleteTask(id)

  }


  @Patch('/:id/status')
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ): Promise<Task> {
    const {status} = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}

