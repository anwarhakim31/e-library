import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  author: string;
  @IsNotEmpty()
  isbn: string;
  @IsNotEmpty()
  stock: number;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  coverImage: string;
}
