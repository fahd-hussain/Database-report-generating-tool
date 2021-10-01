import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/Modules/User/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
