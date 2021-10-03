import { Controller, Get, Param, Request } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':id/tables')
  async getTables(@Param('id') database_id: string, @Request() request) {
    return await this.reportService.getTables(database_id, request);
  }

  @Get(':id/relations')
  async getRelations(@Param('id') database_id: string, @Request() request) {
    return await this.reportService.getRelations(database_id, request);
  }
}
