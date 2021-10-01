import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/Modules/User/Repository/user.repository';
import { AuthController } from 'src/Modules/Auth/auth.controller';
import { AuthRepository } from 'src/Modules/Auth/Repository/auth.repository';
import { AuthService } from 'src/Modules/Auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository, UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
