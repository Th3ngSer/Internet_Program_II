import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(username: string): Promise<import("./user.entity").User | null>;
    createUser(body: createUserDto): Promise<import("./user.entity").User>;
    updateUser(username: string, body: {
        email?: string;
        password?: string;
    }): Promise<import("./user.entity").User | null>;
    deleteUser(username: string): Promise<import("typeorm").DeleteResult>;
}
