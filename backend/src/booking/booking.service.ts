import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateBookingDto } from './dto/createBookingDto';
import { UserType } from 'src/types/user-type';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(user: UserType, request: CreateBookingDto) {
    const startDate = request.date[0];
    const endDate = request.date[1];

    return await this.prisma.booking.create({
      data: {
        note: request.note,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: user.id,
        bookId: request.bookId,
      },
    });
  }
}
