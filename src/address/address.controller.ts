import { Body, Controller, Post, Put, Session, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { UserToken } from 'src/auth/auth.dto';
import { UpdateAddressDto, updateAddressSchema } from './address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(updateAddressSchema))
  createAddress(
    @Body() addressData: UpdateAddressDto,
    @Session() userSession: UserToken,
  ) {
    this.addressService.createAddress({
      ...addressData,
      User: {
        connect: {
          id: userSession.id,
        },
      },
    });

    return {
      address: addressData,
    };
  }

  @UsePipes(new ZodValidationPipe(updateAddressSchema))
  @Put()
  updateAddress(
    @Body() addressData: UpdateAddressDto,
    @Session() userSession: UserToken,
  ) {
    this.addressService.updateAddress({
      where: { userId: userSession.id },
      data: addressData,
    });

    return {
      address: addressData,
      message: 'Endereço atualizado com sucesso!',
    };
  }
}
