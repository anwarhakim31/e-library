import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RegisterDTO } from './dto/register-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(RegisterDTO: RegisterDTO) {
    const { name, email, password } = RegisterDTO;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExist) {
      throw new HttpException('Nama pengguna sudah digunakan', 400);
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async get(email: string) {
    const userData = this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return userData;
  }
}
