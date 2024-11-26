import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import {
  ChangeUserTypeDto,
  changeUserTypeSchema,
  SignInDto,
  signInSchema,
  SignUpDto,
  signUpSchema,
  UserToken,
} from './auth.dto';

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

  @Public()
  @Post('guest')
  @HttpCode(HttpStatus.CREATED)
  createGuest() {
    return this.authService.createGuest();
  }

  @UsePipes(new ZodValidationPipe(changeUserTypeSchema))
  @Post('change-user-type')
  changeUserType(
    @Body()
    changeUserTypeDto: ChangeUserTypeDto,
    @Session() userSession: UserToken,
  ) {
    return this.authService.changeUserType(changeUserTypeDto, userSession);
  }
}
