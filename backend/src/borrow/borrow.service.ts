import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async getAll(search?: string, page?: number, limit?: number) {
    const borrow = await this.prisma.booking.findMany({
      where: {
        NOT: {
          status: 'menunggu',
        },
        OR: [
          { user: { name: { contains: search } } },
          { book: { title: { contains: search } } },
        ],
      },
      include: {
        book: true,
        user: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await this.prisma.booking.count({
      where: {
        NOT: {
          status: 'menunggu',
        },
        OR: [
          { user: { name: { contains: search } } },
          { book: { title: { contains: search } } },
        ],
      },
    });

    return {
      borrow: borrow,
      pagination: {
        total: total,
        page: page,
        limit: limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  async changeStatus(id: string, status: string) {
    return await this.prisma.booking.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
}
