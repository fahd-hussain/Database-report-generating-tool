import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Modules/User/Repository/user.repository';
import { AuthRepository } from 'src/Modules/Auth/Repository/auth.repository';
import { UserEntity } from 'src/Modules/User/Entity/user.entity';
import { RegisterDTO } from 'src/Modules/Auth/DTO/register.dto';
import { LoginDTO } from 'src/Modules/Auth/DTO/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
  ) {}

  register = async (registerDTO: RegisterDTO) => {
    try {
      const user: UserEntity = await this.authRepository.register(registerDTO);

      if (user) {
        return user.toResponseObject();
      }
    } catch (error) {
      if (error.errno === 1062) {
        throw new HttpException('Email already exist', HttpStatus.CONFLICT);
      }

      throw error;
    }
  };

  login = async (loginDTO: LoginDTO) => {
    try {
      const { email, password } = loginDTO;
      const user: UserEntity = await this.userRepository.getUserByEmail({
        email,
      });
      const compare = this.authRepository.comparePassword({ user, password });

      if (compare) {
        return user.toResponseObject();
      }
    } catch (error) {
      if (error.name == 'EntityNotFoundError') {
        throw new HttpException(
          'Email/password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw error;
    }
  };
}
