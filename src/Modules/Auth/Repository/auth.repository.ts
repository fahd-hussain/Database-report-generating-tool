import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/Modules/User/Entity/user.entity';
import { AuthEntity } from 'src/Modules/Auth/Entity/auth.entity';
import { RegisterDTO } from 'src/Modules/Auth/DTO/register.dto';

@EntityRepository(AuthEntity)
export class AuthRepository extends Repository<AuthEntity> {
  register = async ({ email, password }: RegisterDTO): Promise<UserEntity> => {
    const newUser = new UserEntity();
    const newAuth = new AuthEntity();

    newUser.email = email;
    newAuth.password = password;
    newUser.authentication = newAuth;

    await newUser.save();

    return newUser;
  };

  comparePassword = async ({
    user,
    password,
  }: {
    user: UserEntity;
    password: string;
  }) => {
    return await user.authentication.comparePassword(password);
  };
}
