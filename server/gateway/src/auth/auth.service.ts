import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import { UsersUtils } from 'src/users/utils';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await UsersUtils.checkPassword(pass, user.password)) {
      return user;
    }
    return null;
  }

  async register(user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }
}