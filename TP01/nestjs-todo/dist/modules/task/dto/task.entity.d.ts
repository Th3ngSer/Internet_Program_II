import { User } from '../../user/user.entity';
export declare class Task {
    id: number;
    name: string;
    description?: string | null;
    createdAt: Date;
    completedAt?: Date | null;
    user: User;
}
