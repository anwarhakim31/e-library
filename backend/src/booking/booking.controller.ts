import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBookingDto';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guard/authGuard';
import { UserType } from 'src/types/user-type';

@Controller('/api/booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Post('/create')
  async createBooking(
    @Body() request: CreateBookingDto,
    @User() user: UserType,
  ) {
    const res = await this.bookingService.createBooking(user, request);

    console.log(res);

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil menambahkan booking',
    };
  }
}
