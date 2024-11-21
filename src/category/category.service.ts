import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProductCategory, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    data: Prisma.ProductCategoryCreateInput,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.create({
      data,
    });
  }

  async updateCategory(params: {
    where: Prisma.ProductCategoryWhereUniqueInput;
    data: Prisma.ProductCategoryUpdateInput;
  }): Promise<ProductCategory> {
    const { where, data } = params;
    return this.prisma.productCategory.update({
      data,
      where,
    });
  }

  async findOne(params: {
    where: Prisma.ProductCategoryWhereUniqueInput;
  }): Promise<ProductCategory | null> {
    const { where } = params;
    return this.prisma.productCategory.findUnique({
      where,
    });
  }

  async findAll(): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany();
  }
}
