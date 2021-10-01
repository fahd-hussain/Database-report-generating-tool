import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { AuthEntity } from 'src/Modules/Auth/Entity/auth.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @OneToOne(() => AuthEntity, { cascade: true })
  @JoinColumn()
  authentication: AuthEntity;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_del: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, email, created_at, updated_at, token } = this;
    const responseObject: UserRO = {
      id,
      email,
      created_at,
      updated_at,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, email } = this;

    return sign(
      {
        id,
        email,
      },
      env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}

export class UserRO {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  token?: string;
}
