import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register-dto';
import { Response } from 'express';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guard/authGuard';
import { LoginDTO } from './dto/login-dto';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private JwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() RegisterDTO: RegisterDTO, @Res() response: Response) {
    const result = await this.authService.register(RegisterDTO);

    if (result) {
      const token = this.JwtService.sign(result, { expiresIn: '1d' });
      response.cookie('access_token', token, {
        maxAge: 8 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
      });
    }
    response.json({
      success: true,
      data: result,
      message: 'Berhasil mendaftar',
    });
  }

  @Post('/login')
  async login(@Body() LoginDTO: LoginDTO, @Res() response: Response) {
    const result = await this.authService.login(LoginDTO);

    if (result) {
      const token = this.JwtService.sign(result, { expiresIn: '1d' });
      response.cookie('access_token', token, {
        maxAge: 8 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
      });
    }
    response.json({
      success: true,
      data: result,
      message: 'Berhasil masuk',
    });
  }

  @UseGuards(AuthGuard)
  @Get('/current')
  async current(@User() user: any) {
    const result = await this.authService.get(user.email);

    return {
      success: true,
      code: 200,
      data: result,
      message: 'Berhasil mengambil data',
    };
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Res() response: Response) {
    response.clearCookie('access_token');
    response.json({
      success: true,
      code: 200,
      message: 'Berhasil logout',
    });
  }
}
