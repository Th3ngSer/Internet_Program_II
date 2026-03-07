import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  createUser(body: createUserDto) {
    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }

  getUser(username: string) {
    return this.usersRepo.findOne({
      where: { username },
      relations: ['tasks'],
    });
  }

  async updateUser(username: string, body: Partial<User>) {
    if (!username) {
      return null;
    }

    await this.usersRepo.update({ username }, body);
    return this.getUser(username);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}
