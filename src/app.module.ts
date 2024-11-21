import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { categoryModule } from './category/category.module';

@Module({
  imports: [UsersModule, AuthModule, AddressModule, categoryModule],
  providers: [],
})
export class AppModule {}
