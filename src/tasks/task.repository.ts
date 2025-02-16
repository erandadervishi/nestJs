import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto:GetTasksFilterDto): Promise<Task[]> {
    const {status, search} = filterDto;

    const query = this.createQueryBuilder("task");

    if(status) {
      query.andWhere("task.status= :status", {status});
    }

    if(search) {
      query.andWhere(
        "LOWER(task.title) LIKE LOWER(:search) Or LOWER(task.description) LIKE LOWER(:search)",
        {search:`%${search}%`}

      )
    }



    const tasks = await query.getMany();
    return tasks;
  }
}