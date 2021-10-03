import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Modules/User/Repository/user.repository';
import { DatabaseRepository } from 'src/Modules/Database/Repository/database.repository';
import { AddDatabaseDTO } from 'src/Modules/Database/DTO/addDatabase.dto';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly databaseRepository: DatabaseRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async addDatabase(addDatabaseDTO: AddDatabaseDTO, request) {
    try {
      const { id } = request.user || {};
      addDatabaseDTO.user = await this.userRepository.getUserById({ id });
      const database = await this.databaseRepository.addDatabase(
        addDatabaseDTO,
      );

      if (database) {
        return database.toResponseObject();
      }
    } catch (error) {}
  }

  getDatabases(request) {
    try {
      const { id } = request.user || {};

      return this.databaseRepository.getDatabases(id);
    } catch (error) {
      throw error;
    }
  }

  async getDatabase(id: string, request) {
    try {
      const { id: user_Id } = request.user || {};

      const database = await this.databaseRepository.getDatabase(id, user_Id);

      if (!database) {
        throw new HttpException('Entity not found', HttpStatus.OK);
      }

      return database;
    } catch (error) {
      throw error;
    }
  }
}
