import { Controller, UseGuards, Post, Req, HttpCode, Body, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/user.entity";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any): Promise<any> {
    return this.authService.login(req.user);
  }

  @HttpCode(201)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }
}