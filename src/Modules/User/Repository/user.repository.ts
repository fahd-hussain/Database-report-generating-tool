import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/Modules/User/Entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  getUserByEmail = async ({ email }): Promise<any> => {
    return await this.findOneOrFail(
      { email },
      { relations: ['authentication'] },
    );
  };
}
