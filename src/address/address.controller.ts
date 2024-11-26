import {
  Body,
  Controller,
  Get,
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
