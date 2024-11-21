import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CreditCardModule } from './credit-card/credit-card.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AddressModule,
    CategoryModule,
    ProductModule,
    CreditCardModule,
  ],
  providers: [],
})
export class AppModule {}
