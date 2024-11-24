import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreditCard, Prisma } from '@prisma/client';

@Injectable()
export class CreditCardService {
  constructor(private prisma: PrismaService) {}

  async createCreditCard(
    data: Prisma.CreditCardCreateInput,
  ): Promise<CreditCard> {
    return this.prisma.creditCard.create({
      data,
    });
  }

  async updateCreditCard(params: {
    where: Prisma.CreditCardWhereUniqueInput;
    data: Prisma.CreditCardUpdateInput;
  }): Promise<CreditCard> {
    const { where, data } = params;
    return this.prisma.creditCard.update({
      data,
      where,
    });
  }

  async findOne(params: {
    where: Prisma.CreditCardWhereUniqueInput;
  }): Promise<CreditCard | null> {
    const { where } = params;
    return this.prisma.creditCard.findUnique({
      where,
    });
  }

  async findAll(params: {
    where: Prisma.CreditCardWhereInput;
    select?: Prisma.CreditCardSelect;
  }): Promise<CreditCard[]> {
    const { where, select } = params;
    return this.prisma.creditCard.findMany({
      where,
      select,
    });
  }

  async deleteCreditCard(
    where: Prisma.CreditCardWhereUniqueInput,
  ): Promise<CreditCard> {
    return this.prisma.creditCard.delete({
      where,
    });
  }
}
