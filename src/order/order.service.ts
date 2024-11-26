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

    return await this.prisma.order.create({
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
      select: {
        id: true,
        totalPrice: true,
        createdAt: true,
        status: true,
        paymentMethod: true,
        address: {
          select: {
            street: true,
            number: true,
          },
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

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.order.update({
      where,
      data,
    });
  }
}
