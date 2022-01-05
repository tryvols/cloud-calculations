import { Controller, Post, Req, HttpCode, Body, UseInterceptors, ClassSerializerInterceptor, Inject, HttpException } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/user.entity";
import { IServiveTokenCreateResponse } from "src/common/interfaces/token/service-token-create-response.interface";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy
  ) {}

  @Post('login')
  async login(@Body("username") username: string, @Body("password") password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new HttpException("Incorrect username or password", 400);
    }

    const createTokenResponse: IServiveTokenCreateResponse = await firstValueFrom(
      this.tokenServiceClient.send('token_create', {
        userId: user.id,
      })
    );

    return {
      access_token: createTokenResponse.token,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
  }

  @HttpCode(201)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}