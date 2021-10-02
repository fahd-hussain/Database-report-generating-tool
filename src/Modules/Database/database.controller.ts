import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { DatabaseService } from 'src/Modules/Database/database.service';
import { AddDatabaseDTO } from 'src/Modules/Database/DTO/addDatabase.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  addDatabase(@Body() addDatabaseDTO: AddDatabaseDTO, @Request() request) {
    return this.databaseService.addDatabase(addDatabaseDTO, request);
  }

  @Get()
  getDatabases(@Request() request) {
    return this.databaseService.getDatabases(request);
  }

  @Get(':id')
  getDatabase(@Param('id') id, @Request() request) {
    return this.databaseService.getDatabase(id, request);
  }
}
