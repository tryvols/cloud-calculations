import { Controller, Get, Req, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { User } from "./user.entity";
import { Crud } from "@nestjsx/crud";
import { UsersService } from "./users.service";
import { Authorization } from "src/common/decorators/authorization.decorator";

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      queueItems: {
        eager: false,
      },
      'queueItems.queue': {
        eager: false,
      },
    },
    alwaysPaginate: true,
    limit: 25,
    maxLimit: 25,
  },
  routes: {
    only: ['getManyBase'],
  },
})
@Controller('users')
@Authorization(true)
export class UsersController {
  constructor(public readonly service: UsersService) {}

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Req() req) {
    return this.service.findOne(req.user.id);
  }
}