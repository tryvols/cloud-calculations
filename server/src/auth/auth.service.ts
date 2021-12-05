import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersUtils } from 'src/users/utils';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await UsersUtils.checkPassword(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expiresAt: Date.now() + jwtConstants.expiresIn,
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }
}