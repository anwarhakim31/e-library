import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBookingDto';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guard/authGuard';
import { UserType } from '../types/user-type';
import { AdminGuard } from '../guard/adminGuard';

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

  @Get('/user')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getBorrowed(@User() user: UserType, @Query('status') status?: string) {
    const res = await this.bookingService.getBooking(user.id, status);

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil mengambil data booking user',
    };
  }

  @HttpCode(200)
  @Get('/pending')
  @UseGuards(AuthGuard, AdminGuard)
  async getBookingPending(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const res = await this.bookingService.getBookingPending(
      search || '',
      page || 1,
      limit || 10,
    );

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil mengambil data booking pending',
    };
  }
  @HttpCode(200)
  @Delete('/delete')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteBooking(@Body() selected: string[]) {
    const res = await this.bookingService.deleteBooking(selected);

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil menghapus booking',
    };
  }

  @HttpCode(200)
  @Patch('/confirm/:id')
  @UseGuards(AuthGuard, AdminGuard)
  async confirmBooking(@Param('id') id: string) {
    const res = await this.bookingService.confirmBooking(id);

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil mengkonfirmasi booking',
    };
  }
}
