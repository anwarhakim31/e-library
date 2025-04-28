import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const user = await this.prisma.user.count();
    const book = await this.prisma.book.count();
    const booking = await this.prisma.booking.count({
      where: {
        status: 'dipinjam',
      },
    });

    return { user, book, booking };
  }
}
