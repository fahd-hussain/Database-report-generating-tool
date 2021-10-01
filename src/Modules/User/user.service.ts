import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Modules/User/Repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers() {
    try {
      const users = await this.userRepository.find();

      if (!users) {
        return 'users not found';
      }

      const response = Promise.all(
        users.map((user) => user.toResponseObject(false)),
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
