import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RegisterDTO } from './dto/register-dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login-dto';

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
      throw new HttpException('Email sudah digunakan', 400);
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        isAdmin: true,
      },
    });

    return user;
  }
  async login(LoginDTO: LoginDTO) {
    const { email, password } = LoginDTO;

    const isExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isExist) {
      throw new HttpException('Email atau password salah ', 400);
    }

    const isMatch = await bcrypt.compare(password, isExist.password);

    if (!isMatch) {
      throw new HttpException('Email atau password salah ', 400);
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
        isAdmin: true,
      },
    });

    return user;
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
        photo: true,
        isAdmin: true,
        gender: true,
      },
    });

    return userData;
  }
}
