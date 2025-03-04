import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateBookingDto } from './dto/createBookingDto';
import { UserType } from 'src/types/user-type';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(user: UserType, request: CreateBookingDto) {
    const startDate = request.date[0];
    const endDate = request.date[1];
    const bookingCount = await this.prisma.booking.count({
      where: {
        userId: user.id,
        bookId: request.bookId,
      },
    });

    if (bookingCount >= 3) {
      throw new HttpException(
        'Maksimal 3x kesempatan booking  pada 1 buku',
        400,
      );
    }

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

  async getBooking(id: string, status?: string) {
    return await this.prisma.booking.findMany({
      where: {
        userId: id,
        ...(status && { status }),
      },
      include: {
        book: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getBookingPending(search?: string, page?: number, limit?: number) {
    const booking = await this.prisma.booking.findMany({
      where: {
        status: 'menunggu',
        ...(search && {
          OR: [
            { book: { title: { contains: search } } },
            { user: { name: { contains: search } } },
          ],
        }),
        user: {
          isAdmin: false,
        },
      },
      include: {
        book: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prisma.booking.count({
      where: {
        status: 'menunggu',
        ...(search && { book: { title: { contains: search } } }),
      },
    });

    return {
      booking: booking,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  async deleteBooking(selected: string[]) {
    await this.prisma.booking.deleteMany({
      where: {
        id: {
          in: selected,
        },
      },
    });
  }

  async confirmBooking(id: string) {
    const res = await this.prisma.booking.update({
      where: {
        id: id,
      },
      data: {
        status: 'konfirmasi',
      },
    });

    await this.prisma.booking.deleteMany({
      where: {
        userId: res.userId,
        status: 'menunggu',
        id: {
          not: id,
        },
        bookId: res.bookId,
      },
    });

    return res;
  }
}
