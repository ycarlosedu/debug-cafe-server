import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductService } from 'src/product/product.service';
import { OrderFeedbackService } from 'src/order-feedback/order-feedback.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    ProductService,
    OrderFeedbackService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
