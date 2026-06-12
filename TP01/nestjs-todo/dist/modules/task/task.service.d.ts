import { Repository } from 'typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './dto/task.entity';
import { User } from '../user/user.entity';
export declare class TaskService {
    private readonly tasksRepo;
    private readonly usersRepo;
    constructor(tasksRepo: Repository<Task>, usersRepo: Repository<User>);
    getTask(id: string): Promise<Task | null>;
    getTasks(): Promise<Task[]>;
    createTask(body: createTaskDto): Promise<Task>;
    markTaskAsDone(id: string): Promise<Task | null>;
    markTaskAsPending(id: string): Promise<Task | null>;
    deleteTask(id: string): Promise<import("typeorm").DeleteResult>;
}
