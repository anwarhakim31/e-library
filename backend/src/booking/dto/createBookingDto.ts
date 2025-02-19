import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  date: JSON;

  @IsNotEmpty()
  bookId: string;

  @IsOptional()
  note?: string;
}
