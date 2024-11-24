import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Product, Prisma } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: CreateProductDto): Promise<Product> {
    const { categories, ...product } = data;

    return this.prisma.product.create({
      data: {
        ...product,
        categories: {
          create: categories.map((category) => ({
            productCategoryId: category,
          })),
        },
      },
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: UpdateProductDto;
  }): Promise<Product> {
    const { where, data } = params;
    const { categories, ...product } = data;
    return this.prisma.product.update({
      data: {
        ...product,
        categories: {
          deleteMany: {
            productCategoryId: {
              notIn: categories,
            },
          },
          create: categories.map((category) => ({
            productCategory: {
              connect: {
                id: category,
              },
            },
          })),
        },
      },
      where,
    });
  }

  async findOne(params: { where: Prisma.ProductWhereUniqueInput }) {
    const { where } = params;
    const categories = await this.prisma.productCategory.findMany({
      select: {
        name: true,
      },
      where: {
        products: {
          some: {
            productId: where.id,
          },
        },
      },
    });

    const product = await this.prisma.product.findUnique({
      where,
    });

    return {
      ...product,
      categories: categories.map((category) => category.name),
    };
  }

  async findAll(
    params: {
      where?: Prisma.ProductWhereInput;
    } = {},
  ): Promise<Product[]> {
    const { where } = params;
    return this.prisma.product.findMany({
      where,
    });
  }

  async findByOrder(params: { orderId: string }) {
    const { orderId } = params;
    return this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        productsOnOrder: {
          select: {
            quantity: true,
          },
          where: {
            orderId,
          },
        },
      },
      where: {
        productsOnOrder: {
          some: {
            orderId,
          },
        },
      },
    });
  }
}
