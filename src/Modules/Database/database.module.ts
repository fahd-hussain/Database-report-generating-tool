import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseController } from 'src/Modules/Database/database.controller';
import { DatabaseService } from 'src/Modules/Database/database.service';
import { DatabaseRepository } from 'src/Modules/Database/Repository/database.repository';
import { UserRepository } from 'src/Modules/User/Repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseRepository, UserRepository])],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
