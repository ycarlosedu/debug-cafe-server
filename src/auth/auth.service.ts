import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto, UserToken } from './auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ERROR } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createToken(user: User): Promise<string> {
    const payload: UserToken = { id: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (!user || !isMatch) {
      throw new UnauthorizedException(ERROR.INVALID_CREDENTIALS);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token: await this.createToken(user),
    };
  }

  async signUp({ email, fullName, phone, password }: SignUpDto): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException(ERROR.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await this.usersService.createUser({
      email,
      password: hashedPassword,
      fullName,
      phone,
    });
    return {
      user: {
        id: userCreated.id,
        email: userCreated.email,
        fullName: userCreated.fullName,
      },
      token: await this.createToken(userCreated),
    };
  }
}
