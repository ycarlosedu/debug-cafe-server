import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(
    @Body()
    signUpDto: {
      email: string;
      fullName: string;
      phone: string;
      password: string;
    },
  ) {
    return this.authService.signUp(signUpDto);
  }
}
