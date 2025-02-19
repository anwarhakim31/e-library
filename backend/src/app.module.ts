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

@Module({
  imports: [AuthModule, CommonModule, BookModule, UserModule, BookingModule],
  controllers: [AppController, AuthController, BookingController],
  providers: [AppService, AuthService, BookingService],
})
export class AppModule {}
