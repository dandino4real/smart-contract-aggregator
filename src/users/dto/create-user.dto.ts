import { IsString, IsOptional, IsArray, ArrayUnique } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  interests?: string[];
}
