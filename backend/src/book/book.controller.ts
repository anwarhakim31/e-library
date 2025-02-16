import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book-dto';

@Controller('/api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/all')
  async getAllBook(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const res = await this.bookService.getAllBook(
      search || '',
      page || 1,
      limit || 10,
    );

    return {
      success: true,
      data: {
        book: res.data,
        pagination: res.pagination,
      },
      code: 200,
      message: 'Berhasil mengambil data buku',
    };
  }

  @Get('/:id')
  async getBook(@Param('id') id: string) {
    const res = await this.bookService.getBook(id);

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil mengambil data buku',
    };
  }

  @Post('/create')
  async createBook(@Body() createBookDto: CreateBookDto) {
    try {
      const res = await this.bookService.createBook(createBookDto);

      return {
        success: true,
        data: res,
        code: 200,
        message: 'Berhasil menambahkan buku',
      };
    } catch (error) {
      console.log(error);
    }
  }
  @Put('/:id')
  async updateBook(
    @Body() createBookDto: CreateBookDto,
    @Param('id') id: string,
  ) {
    const res = await this.bookService.updateBook(id, createBookDto);

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil memngedit buku',
    };
  }

  @Delete('/delete')
  async deleteBook(@Body() selected: string[]) {
    const res = await this.bookService.deleteBook(selected);

    return {
      success: true,
      data: res,
      code: 200,
      message: 'Berhasil menghapus buku',
    };
  }
}
