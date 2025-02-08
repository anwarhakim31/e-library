import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CommonController } from './common.controller';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  controllers: [CommonController],
  exports: [PrismaService],
})
export class CommonModule {}
