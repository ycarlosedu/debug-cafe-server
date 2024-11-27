import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Put,
  Session,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { UserToken } from 'src/auth/auth.dto';
import { UpdateAddressDto, updateAddressSchema } from './address.dto';
import { AddressService } from './address.service';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  private readonly logger = new Logger(AddressController.name);

  @Post()
  @UsePipes(new ZodValidationPipe(updateAddressSchema))
  async createAddress(
    @Body() addressData: UpdateAddressDto,
    @Session() userSession: UserToken,
  ) {
    const address = await this.addressService.createAddress({
      ...addressData,
      user: {
        connect: {
          id: userSession.id,
        },
      },
    });
    this.logger.log(`Endereço criado para o usuário: ${userSession.email}`);

    return {
      address,
    };
  }

  @UsePipes(new ZodValidationPipe(updateAddressSchema))
  @Put('/me')
  async updateAddress(
    @Body() addressData: UpdateAddressDto,
    @Session() userSession: UserToken,
  ) {
    const address = await this.addressService.updateAddress({
      where: { userId: userSession.id },
      data: addressData,
    });
    this.logger.log(`Endereço atualizado para o usuário: ${userSession.email}`);

    return {
      address,
      message: 'Endereço atualizado com sucesso!',
    };
  }

  @Get('/me')
  getMyAddress(@Session() userSession: UserToken) {
    return this.addressService.findOne({
      where: { userId: userSession.id },
      select: {
        id: true,
        street: true,
        number: true,
        city: true,
        cep: true,
      },
    });
  }
}
