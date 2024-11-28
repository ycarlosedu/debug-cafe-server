import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { OrderModule } from './order/order.module';
import { OrderFeedbackModule } from './order-feedback/order-feedback.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AddressModule,
    CategoryModule,
    ProductModule,
    CreditCardModule,
    OrderModule,
    OrderFeedbackModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
