import { Body, Controller, Put, Session, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { UpdateUserDto, updateUserSchema } from './users.dto';
import { UserToken } from 'src/auth/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ZodValidationPipe(updateUserSchema))
  @Put()
  updateUser(
    @Body() userData: UpdateUserDto,
    @Session() userSession: UserToken,
  ) {
    this.usersService.updateUser({
      where: { id: userSession.id },
      data: {
        fullName: userData.fullName,
        phone: userData.phone,
      },
    });

    return {
      user: {
        fullName: userData.fullName,
        phone: userData.phone,
      },
      message: 'Usuário atualizado com sucesso!',
    };
  }
}
