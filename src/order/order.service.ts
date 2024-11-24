import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: CreateOrderDto, userId: string) {
    const { products, ...order } = data;

    const productsIds = products.map(({ id }) => id);
    const productsOnDatabase = await this.prisma.product.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
    });

    const totalPrice = productsOnDatabase.reduce((acc, product) => {
      const productData = products.find(({ id }) => id === product.id)!;
      return acc + productData.quantity * product.price;
    }, 0);

    return this.prisma.order.create({
      select: {
        id: true,
      },
      data: {
        ...order,
        totalPrice,
        userId,
        productsOnOrder: {
          create: products.map(({ id, quantity }) => ({
            productId: id,
            quantity,
          })),
        },
      },
    });
  }

  async findOne(params: {
    where: Prisma.OrderWhereUniqueInput;
    select?: Prisma.OrderSelect;
  }) {
    const { where, select } = params;
    return this.prisma.order.findUnique({
      where,
      select,
    });
  }

  async findAll(params: {
    where?: Prisma.OrderWhereInput;
    select?: Prisma.OrderSelect;
  }): Promise<Order[]> {
    const { where, select } = params;
    return this.prisma.order.findMany({
      where,
      select,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}