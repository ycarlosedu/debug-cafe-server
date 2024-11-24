import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { UserToken } from 'src/auth/auth.dto';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto, createCreditCardSchema } from './credit-card.dto';
import { hideCreditCard } from 'src/utils/hideCreditCard';

@Controller('credit-cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCreditCardSchema))
  async createCreditCard(
    @Body() creditCardData: CreateCreditCardDto,
    @Session() userSession: UserToken,
  ) {
    const creditCardExists = await this.creditCardService.findAll({
      where: {
        cardNumber: creditCardData.cardNumber,
        userId: userSession.id,
      },
    });

    if (creditCardExists.length) {
      throw new BadRequestException('Cartão já cadastrado');
    }

    const creditCard = await this.creditCardService.createCreditCard({
      ...creditCardData,
      user: {
        connect: {
          id: userSession.id,
        },
      },
    });

    return {
      creditCard: {
        id: creditCard.id,
        cardNumber: hideCreditCard(creditCard.cardNumber),
      },
      message: 'Cartão adicionado com sucesso!',
    };
  }

  @Get()
  async getCreditCards(@Session() userSession: UserToken) {
    const creditCards = await this.creditCardService.findAll({
      where: {
        userId: userSession.id,
      },
      select: {
        id: true,
        cardNumber: true,
      },
    });

    return creditCards.map(({ id, cardNumber }) => ({
      id,
      cardNumber: hideCreditCard(cardNumber),
    }));
  }

  @Delete(':id')
  deleteCreditCard(@Session() userSession: UserToken, @Param('id') id: string) {
    this.creditCardService.deleteCreditCard({
      id,
      userId: userSession.id,
    });

    return {
      id,
      message: 'Cartão deletado com sucesso!',
    };
  }
}
