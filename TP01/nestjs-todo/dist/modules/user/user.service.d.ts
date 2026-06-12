import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class UserService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    createUser(body: createUserDto): Promise<User>;
    getUser(username: string): Promise<User | null>;
    updateUser(username: string, body: Partial<User>): Promise<User | null>;
    deleteUser(username: string): Promise<import("typeorm").DeleteResult>;
}
