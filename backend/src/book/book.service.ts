import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateBookDto } from './dto/create-book-dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async getAllBook(search: string, page: number, limit: number) {
    const book = await this.prisma.book.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const total = await this.prisma.book.count({
      where: {
        title: {
          contains: search,
        },
      },
    });

    return {
      data: book,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  async getBook(id: string) {
    const isExist = await this.prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!isExist) {
      throw new HttpException('Buku tidak ditemukan', 404);
    }

    const book = await this.prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    return book;
  }

  async createBook(create: CreateBookDto) {
    const isExist = await this.prisma.book.findUnique({
      where: {
        isbn: create.isbn,
      },
    });

    if (isExist) {
      throw new HttpException('ISBN sudah digunakan', 400);
    }
    return await this.prisma.book.create({
      data: create,
    });
  }

  async updateBook(id: string, update: CreateBookDto) {
    const isExist = await this.prisma.book.findFirst({
      where: {
        isbn: update.isbn,
        NOT: {
          id: id,
        },
      },
    });

    if (isExist) {
      throw new HttpException('ISBN sudah digunakan', 400);
    }

    return await this.prisma.book.update({
      where: {
        id: id,
      },
      data: update,
    });
  }

  async deleteBook(id: string[]) {
    return await this.prisma.book.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
  }
}
