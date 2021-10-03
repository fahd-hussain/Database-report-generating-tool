import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseRepository } from 'src/Modules/Database/Repository/database.repository';
import { ReportController } from 'src/Modules/Report/report.controller';
import { ReportService } from 'src/Modules/Report/report.service';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseRepository])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
