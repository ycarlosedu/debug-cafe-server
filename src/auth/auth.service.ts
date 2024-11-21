import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
    return user;
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
    return this.usersService.createUser({ email, password, fullName, phone });
  }
}
