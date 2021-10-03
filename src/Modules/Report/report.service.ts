import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../Database/Repository/database.repository';

@Injectable()
export class ReportService {
  constructor(private readonly databaseRepository: DatabaseRepository) {}
}
