import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './dto/task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  getTask(id: string) {
    return this.tasksRepo.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });
  }

  getTasks() {
    return this.tasksRepo.find({
      relations: ['user'],
      order: { id: 'ASC' },
    });
  }

  async createTask(body: createTaskDto) {
    const task = this.tasksRepo.create({
      name: body.name,
      description: body.description ?? null,
    });

    if (typeof body.userId === 'number') {
      const user = await this.usersRepo.findOne({ where: { id: body.userId } });
      if (user) {
        task.user = user;
      }
    }

    return this.tasksRepo.save(task);
  }

  async markTaskAsDone(id: string) {
    const taskId = Number(id);
    await this.tasksRepo.update(taskId, { completedAt: new Date() });
    return this.getTask(id);
  }

  async markTaskAsPending(id: string) {
    const taskId = Number(id);
    await this.tasksRepo.update(taskId, { completedAt: null });
    return this.getTask(id);
  }

  deleteTask(id: string) {
    return this.tasksRepo.delete(Number(id));
  }
}
