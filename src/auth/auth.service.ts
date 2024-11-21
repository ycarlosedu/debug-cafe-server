import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({
    email,
    fullName,
    phone,
    password,
  }: {
    email: string;
    fullName: string;
    phone: string;
    password: string;
  }): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException();
    }

    const userCreated = await this.usersService.createUser({
      email,
      password,
      fullName,
      phone,
    });
    const payload = { sub: userCreated.id, email: userCreated.email };
    return {
      user: {
        id: userCreated.id,
        email: userCreated.email,
        fullName: userCreated.fullName,
      },
      token: await this.jwtService.signAsync(payload),
    };
  }
}
