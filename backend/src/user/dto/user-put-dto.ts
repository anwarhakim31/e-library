import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserPutDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  photo: string;

  @IsNotEmpty()
  gender: string;

  @IsOptional()
  password: string;
}
