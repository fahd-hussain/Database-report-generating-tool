import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipe/validation.pipe';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() registerDTO: RegisterDTO) {
    return this.authService.login(registerDTO);
  }
}
