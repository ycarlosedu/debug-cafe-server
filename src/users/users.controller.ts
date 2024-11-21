import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  updateUser(userData: {
    email: string;
    fullName: string;
    phone: string;
    password: string;
  }): Promise<User> {
    return this.usersService.updateUser({
      where: { email: userData.email },
      data: {
        fullName: userData.fullName,
        phone: userData.phone,
        password: userData.password,
      },
    });
  }
}
