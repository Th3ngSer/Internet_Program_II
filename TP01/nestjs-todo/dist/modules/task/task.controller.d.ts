import { TaskService } from './task.service';
import { createTaskDto } from './dto/create-task.dto';
export declare class TasksController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTasks(): Promise<import("./dto/task.entity").Task[]>;
    getTask(id: string): Promise<import("./dto/task.entity").Task | null>;
    createTask(body: createTaskDto): Promise<import("./dto/task.entity").Task>;
    markTaskAsDone(id: string): Promise<import("./dto/task.entity").Task | null>;
    markTaskAsPending(id: string): Promise<import("./dto/task.entity").Task | null>;
    deleteTask(id: string): Promise<import("typeorm").DeleteResult>;
}
