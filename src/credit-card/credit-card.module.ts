import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';
import { PrismaService } from 'src/database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [CreditCardController],
  providers: [
    CreditCardService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [CreditCardService],
})
export class CreditCardModule {}
