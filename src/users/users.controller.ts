import { Body, Controller, Get, Put, Session, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { UpdateUserDto, updateUserSchema } from './users.dto';
import { UserToken } from 'src/auth/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UsePipes(new ZodValidationPipe(updateUserSchema))
  @Put()
  updateUser(
    @Body() userData: UpdateUserDto,
    @Session() userSession: UserToken,
  ): Promise<User> {
    return this.usersService.updateUser({
      where: { id: userSession.id },
      data: {
        fullName: userData.fullName,
        phone: userData.phone,
        password: userData.password,
      },
    });
  }
}
