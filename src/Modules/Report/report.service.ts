import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { DatabaseRepository } from 'src/Modules/Database/Repository/database.repository';

@Injectable()
export class ReportService {
  constructor(private readonly databaseRepository: DatabaseRepository) { }

  async checkDatabase(database_id: string, request) {
    const { id: user_Id } = request.user || {};

    const newConnection = await this.createDBConnection(database_id, user_Id);

    const isConnected = newConnection.isConnected;
    newConnection.close();

    return isConnected;
  }
  async getTables(database_id: string, request) {
    const { id: user_Id } = request.user || {};

    const newConnection = await this.createDBConnection(database_id, user_Id);

    const query = `
      SELECT 
        TABLE_NAME,
        COLUMN_NAME,
        COLUMN_KEY,
        DATA_TYPE
      FROM 
        information_schema.columns 
      WHERE 
        table_schema = 'ssa'
      ORDER BY TABLE_NAME, COLUMN_NAME ASC
      `;

    const tables: Array<any> = await newConnection.query(query);

    newConnection.close();
    return Object.values(tables)
  }

  async getRelations(database_id: string, request) {
    const { id: user_Id } = request.user || {};

    const newConnection = await this.createDBConnection(database_id, user_Id);

    const query = `
      SELECT
        TABLE_SCHEMA,
        TABLE_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_SCHEMA,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE
        TABLE_SCHEMA = SCHEMA() 
        AND REFERENCED_TABLE_NAME IS NOT NULL
      `;

    const relations = await newConnection.query(query);

    newConnection.close();
    return relations;
  }

  createDBConnection = async (database_id, user_Id) => {
    const userDatabase = await this.databaseRepository.getDatabase(
      database_id,
      user_Id,
    );

    if (!userDatabase) {
      throw new HttpException('Entity not found', HttpStatus.OK);
    }

    const { name, host, port, username, password, database } = userDatabase;

    return await createConnection({
      type: 'mysql',
      name,
      host,
      port,
      username,
      password,
      database,
    });
  };
}
