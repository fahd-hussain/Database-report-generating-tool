import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/Modules/User/Entity/user.entity';

export class AddDatabaseDTO {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  host: string;

  @IsNotEmpty()
  port: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  database: string;

  user: UserEntity;
}
