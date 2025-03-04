import {
  Body,
  Controller,
  Get,
  HttpCode,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('/api/borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const res = await this.borrowService.getAll(
      search || '',
      page || 1,
      limit || 10,
    );

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil mengambil data peminjaman',
    };
  }

  @Patch('/status')
  async changeStatus(@Body() request: { id: string; status: string }) {
    const res = await this.borrowService.changeStatus(
      request.id,
      request.status,
    );

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil mengubah status peminjaman',
    };
  }
}
