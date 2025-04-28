import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { BookingService } from './booking/booking.service';
import { BookingController } from './booking/booking.controller';
import { BookingModule } from './booking/booking.module';
import { BorrowModule } from './borrow/borrow.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    BookModule,
    UserModule,
    BookingModule,
    BorrowModule,
    DashboardModule,
  ],
  controllers: [AppController, AuthController, BookingController, DashboardController],
  providers: [AppService, AuthService, BookingService, DashboardService],
})
export class AppModule {}
