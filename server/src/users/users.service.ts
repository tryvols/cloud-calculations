import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UsersUtils } from './utils';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
    this.initUsers();
  }

  // TODO:clear-before-production
  async initUsers(): Promise<void> {
    await this.usersRepository.insert([{
      username: 'username',
      password: await UsersUtils.encodePassword('password'),
      firstName: 'John',
      lastName: 'Readlock',
    }, {
      username: 'chris',
      password: await UsersUtils.encodePassword('secret'),
      firstName: 'Chris',
      lastName: 'Steelbrought',
    }, {
      username: 'maria',
      password: await UsersUtils.encodePassword('guess'),
      firstName: 'Maria',
      lastName: 'Cleanington',
    }, {
      username: 'sony',
      password: await UsersUtils.encodePassword('password'),
      firstName: 'Sony',
      lastName: 'Jenkins',
    }]);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }
}