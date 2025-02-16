import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  title?: string;
  @IsNotEmpty()
  author?: string;
  @IsNotEmpty()
  coverImage?: string;
  @IsNotEmpty()
  stock?: number;
  @IsNotEmpty()
  description?: string;
}
