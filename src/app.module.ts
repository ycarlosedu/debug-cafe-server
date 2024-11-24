import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AddressModule,
    CategoryModule,
    ProductModule,
    CreditCardModule,
    OrderModule,
  ],
  providers: [],
})
export class AppModule {}
