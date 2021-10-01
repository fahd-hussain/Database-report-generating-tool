import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/Modules/User/Repository/user.repository';
import { UserController } from 'src/Modules/User/user.controller';
import { UserService } from 'src/Modules/User/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
