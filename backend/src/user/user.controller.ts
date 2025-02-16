import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { AuthGuard } from '../guard/authGuard';
import { User } from '../decorators/user.decorator';
import { AdminGuard } from '../guard/adminGuard';
import { UserPutDto } from './dto/user-put-dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(200)
  @Get('/all')
  async getAll(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const request = {
      search: search || '',
      page: page || 1,
      limit: limit || 10,
    };

    const result = await this.userService.getAll(request);

    return {
      success: true,
      message: 'Berhasil mengambil data pengguna',
      code: 200,
      data: {
        user: result.data,
        pagination: result.paging,
      },
    };
  }

  @Delete('/delete')
  @HttpCode(200)
  @UseGuards(AuthGuard, AdminGuard)
  async Delete(@Body() selected: string[]) {
    await this.userService.delete(selected);

    return {
      success: true,
      code: 200,

      message: 'Berhasil menghapus data pengguna',
    };
  }

  @Put('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AdminGuard)
  async Put(@Body() request: UserPutDto, @Param('id') id: string) {
    await this.userService.put(id, request);

    return {
      success: true,
      code: 200,
      message: 'Berhasil mengeubah  data pengguna',
    };
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Patch('/profile')
  async editProfile(@Body() request: UserPutDto, @User() user: { id: string }) {
    return this.userService.editProfile(user.id, request);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Patch('/password')
  async changePassword(
    @Body() request: { password: string; newPassword: string },
    @User() user: { username: string },
  ) {
    return this.userService.changePassword(user.username, request);
  }
}
