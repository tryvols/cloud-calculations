import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    private readonly usersService: UsersService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const securedHandler = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    const securedClass = this.reflector.get<string[]>(
      'secured',
      context.getClass()
    );

    if (!securedHandler && !securedClass) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')?.[1];

    if (!token) {
      return false;
    }

    const userTokenInfo = await firstValueFrom(
      this.tokenServiceClient.send('token_decode', { token }),
    );

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    request.user = await this.usersService.findOneById(+userTokenInfo.data.userId);
    return true;
  }
}
