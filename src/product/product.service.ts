import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Product, Prisma } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: CreateProductDto) {
    const { categories, ...product } = data;

    const productCreated = await this.prisma.product.create({
      data: {
        ...product,
        categories: {
          create: categories.map((category) => ({
            productCategoryId: category,
          })),
        },
      },
    });

    const categoriesOnProduct = await this.prisma.productCategory.findMany({
      select: {
        name: true,
        id: true,
      },
      where: {
        products: {
          some: {
            productId: productCreated.id,
          },
        },
      },
    });

    return {
      ...productCreated,
      categories: categoriesOnProduct,
    };
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: UpdateProductDto;
  }) {
    const { where, data } = params;
    const { categories, ...product } = data;
    const productCreated = await this.prisma.product.update({
      data: {
        ...product,
        categories: {
          deleteMany: {
            productCategoryId: {
              in: categories,
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

    const categoriesOnProduct = await this.prisma.productCategory.findMany({
      select: {
        name: true,
        id: true,
      },
      where: {
        products: {
          some: {
            productId: productCreated.id,
          },
        },
      },
    });

    return {
      ...productCreated,
      categories: categoriesOnProduct,
    };
  }

  async findOne(params: { where: Prisma.ProductWhereUniqueInput }) {
    const { where } = params;
    const categories = await this.prisma.productCategory.findMany({
      select: {
        name: true,
        id: true,
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
      categories,
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
