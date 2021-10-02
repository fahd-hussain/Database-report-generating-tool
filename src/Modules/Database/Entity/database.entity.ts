import { UserEntity } from 'src/Modules/User/Entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('database')
export class DatabaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  database: string;

  @ManyToOne(() => UserEntity, (ue) => ue.databases)
  user: UserEntity;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_del: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toResponseObject(): DatabaseRO {
    const {
      id,
      type,
      name,
      host,
      port,
      username,
      database,
      created_at,
      updated_at,
    } = this;

    const responseObject: DatabaseRO = {
      id,
      type,
      name,
      host,
      port,
      username,
      database,
      created_at,
      updated_at,
    };

    return responseObject;
  }
}

export class DatabaseRO {
  id: string;
  type: string;
  name: string;
  host: string;
  port: number;
  username: string;
  database: string;
  created_at: Date;
  updated_at: Date;
}
