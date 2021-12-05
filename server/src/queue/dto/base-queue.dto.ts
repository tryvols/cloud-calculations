import { IsString, MaxLength, MinLength, IsOptional, IsNumber, IsISO8601 } from "class-validator";

export class BaseQueueDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(100)
  address: string;
}

export class NewQueueEntityDto extends BaseQueueDto {
  @IsISO8601({ strict: true })
  @IsOptional()
  expiresAt?: Date;

  @IsNumber()
  @IsOptional()
  maxVolume?: number;
}
