import {
  Body,
  Controller,
  Get,
  Logger,
  Put,
  Session,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { UpdateUserDto, updateUserSchema } from './user.dto';
import { UserToken } from 'src/auth/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  @Get('me')
  getUser(@Session() userSession: UserToken) {
    return this.usersService.findOne({
      where: { id: userSession.id },
      select: {
        fullName: true,
        phone: true,
        email: true,
      },
    });
  }

  @UsePipes(new ZodValidationPipe(updateUserSchema))
  @Put('me')
  async updateUser(
    @Body() userData: UpdateUserDto,
    @Session() userSession: UserToken,
  ) {
    const user = await this.usersService.updateUser({
      where: { id: userSession.id },
      data: {
        fullName: userData.fullName,
        phone: userData.phone,
      },
    });

    this.logger.log(`Usuário ${user.email} atualizou seus dados com sucesso`);

    return {
      user: {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        userType: user.userType,
      },
      message: 'Usuário atualizado com sucesso!',
    };
  }
}
