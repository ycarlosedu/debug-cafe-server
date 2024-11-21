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
import { CreateUserDto, createUserSchema } from 'src/users/users.dto';
import { SignInDto, signInSchema } from './auth.dto';

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
  @UsePipes(new ZodValidationPipe(createUserSchema))
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.authService.signUp(createUserDto);
  }
}
