import { Module } from '@nestjs/common';
import { OrderFeedbackController } from './order-feedback.controller';
import { OrderFeedbackService } from './order-feedback.service';
import { PrismaService } from 'src/database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from 'src/order/order.service';

@Module({
  controllers: [OrderFeedbackController],
  providers: [
    OrderFeedbackService,
    OrderService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [OrderFeedbackService],
})
export class OrderFeedbackModule {}
