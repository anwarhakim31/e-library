import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

import * as bcrypt from 'bcrypt';
import { UserPutDto } from './dto/user-put-dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(request: { search: string; page: number; limit: number }) {
    const filter = [];

    if (request.search) {
      filter.push({
        name: {
          contains: request.search,
        },
        email: {
          contains: request.search,
        },
      });
    }

    const user = await this.prismaService.user.findMany({
      where: {
        AND: filter,
        isAdmin: false,
      },
      skip: (request.page - 1) * request.limit,
      take: request.limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        email: true,
        name: true,
        photo: true,
        id: true,
      },
    });

    const total = await this.prismaService.user.count({
      where: {
        AND: filter,
        isAdmin: false,
      },
    });

    return {
      data: user,
      paging: {
        limit: request.limit,
        totalPage: Math.ceil(total / request.limit),
        page: request.page,
        total: total,
      },
    };
  }
  async delete(request: string[]) {
    const disease = await this.prismaService.user.deleteMany({
      where: {
        id: {
          in: request,
        },
      },
    });

    if (disease.count == 0 || disease.count < request.length) {
      throw new HttpException('pengguna tidak ditemukan', 404);
    }

    return disease;
  }

  async put(id: string, request: UserPutDto) {
    const user = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: request.name,
        email: request.email,
        photo: request.photo,
        gender: request.gender,
      },
    });

    if (request.password) {
      const salt = await bcrypt.genSalt();
      request.password = await bcrypt.hash(request.password, salt);

      await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          password: request.password,
        },
      });
    }

    return user;
  }

  async editProfile(id: string, request: UserPutDto) {
    if (request.password) {
      const salt = await bcrypt.genSalt();
      request.password = await bcrypt.hash(request.password, salt);

      await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          password: request.password,
        },
      });
    }

    const user = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: request.name,
        email: request.email,
        photo: request.photo,
        gender: request.gender,
      },
    });

    return {
      name: user.name,
      email: user.email,
      gender: user.gender,
      photo: user.photo,
      isAdmin: user.isAdmin,
    };
  }

  async changePassword(
    id: string,
    request: {
      password: string;
      newPassword: string;
    },
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException('Akun tidak ditemukan', 404);
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password lama salah', 400);
    }

    const gensalt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(request.newPassword, gensalt);

    const updated = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      name: updated.name,
      email: updated.email,
      gender: updated.gender,
      photo: updated?.photo || null,
      isAdmin: updated.isAdmin,
    };
  }
}
