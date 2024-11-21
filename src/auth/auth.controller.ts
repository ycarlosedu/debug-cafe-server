import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { SignInDto, signInSchema, SignUpDto, signUpSchema } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UsePipes(new ZodValidationPipe(signInSchema))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @UsePipes(new ZodValidationPipe(signUpSchema))
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(
    @Body()
    signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(signUpDto);
  }
}
