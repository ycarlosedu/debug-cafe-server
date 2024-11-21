import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Session,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { UserToken } from 'src/auth/auth.dto';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto, createCreditCardSchema } from './credit-card.dto';

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCreditCardSchema))
  createCreditCard(
    @Body() creditCardData: CreateCreditCardDto,
    @Session() userSession: UserToken,
  ) {
    this.creditCardService.createCreditCard({
      ...creditCardData,
      user: {
        connect: {
          id: userSession.id,
        },
      },
    });

    return {
      creditCard: creditCardData,
    };
  }

  @UsePipes(new ZodValidationPipe(createCreditCardSchema))
  @Put(':id')
  updateCreditCard(
    @Body() creditCardData: CreateCreditCardDto,
    @Session() userSession: UserToken,
    @Param('id') id: string,
  ) {
    this.creditCardService.updateCreditCard({
      where: { userId: userSession.id, id },
      data: creditCardData,
    });

    return {
      creditCard: creditCardData,
      message: 'Cartão atualizado com sucesso!',
    };
  }

  @Delete(':id')
  deleteCreditCard(@Session() userSession: UserToken, @Param('id') id: string) {
    this.creditCardService.deleteCreditCard({
      id,
      userId: userSession.id,
    });

    return {
      message: 'Cartão deletado com sucesso!',
    };
  }
}
