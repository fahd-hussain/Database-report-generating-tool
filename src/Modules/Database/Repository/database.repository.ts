import { EntityRepository, Repository } from 'typeorm';
import { AddDatabaseDTO } from '../DTO/addDatabase.dto';
import { DatabaseEntity } from '../Entity/database.entity';

@EntityRepository(DatabaseEntity)
export class DatabaseRepository extends Repository<DatabaseEntity> {
  addDatabase = async ({
    type,
    name,
    host,
    port,
    username,
    password,
    database,
    user,
  }: AddDatabaseDTO): Promise<DatabaseEntity> => {
    const newDatabase = new DatabaseEntity();

    newDatabase.type = type;
    newDatabase.name = name;
    newDatabase.host = host;
    newDatabase.port = port;
    newDatabase.username = username;
    newDatabase.password = password;
    newDatabase.database = database;
    newDatabase.user = user;

    return await newDatabase.save();
  };

  getDatabases = async (id): Promise<Array<DatabaseEntity>> => {
    return await this.find({
      join: { alias: 'db', leftJoin: { user: 'db.user' } },
      where: { user: { id } },
    });
  };

  getDatabase = async (
    id: string,
    user_id: string,
  ): Promise<DatabaseEntity> => {
    return await this.findOne({
      join: { alias: 'db', leftJoin: { user: 'db.user' } },
      where: { user: { id: user_id }, id },
    });
  };
}
