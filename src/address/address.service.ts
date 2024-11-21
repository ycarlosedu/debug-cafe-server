import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Address, Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async createAddress(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({
      data,
    });
  }

  async updateAddress(params: {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.AddressUpdateInput;
  }): Promise<Address> {
    const { where, data } = params;
    return this.prisma.address.update({
      data,
      where,
    });
  }

  async findOne(params: {
    where: Prisma.AddressWhereUniqueInput;
  }): Promise<Address | null> {
    const { where } = params;
    return this.prisma.address.findUnique({
      where,
    });
  }

  async findAll(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }
}
