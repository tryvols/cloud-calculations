import { IsString, MinLength, MaxLength } from "class-validator";
import { ValidIfCondition } from "../../common/validators/condition.validator";
import { Unique } from "../../common/validators/unique.validator";
import { User } from "../user.entity";

export class CreateUserDto {
  @MinLength(1)
  @MaxLength(30)
  @IsString()
  @Unique(User, 'Username must be unique')
  username: string;
  
  @MinLength(2)
  @MaxLength(30)
  @IsString()
  firstName: string;

  @MinLength(2)
  @MaxLength(30)
  @IsString()
  lastName: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  password: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  @ValidIfCondition(
    dto => dto.password === dto.passwordConfirmation,
    'passwordConfirmation field must be equal with password field',
  )
  passwordConfirmation: string;
}