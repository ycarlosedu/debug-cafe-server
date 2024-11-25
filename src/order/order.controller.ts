import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { CreateOrderDto, createOrderSchema } from './order.dto';
import { OrderService } from './order.service';
import { UserToken } from 'src/auth/auth.dto';
import { ProductService } from 'src/product/product.service';
import { ORDER_STATUS, USER_TYPE } from '@prisma/client';

const ORDERS_USER_TYPE = {
  [USER_TYPE.STAFF]: [ORDER_STATUS.PENDING, ORDER_STATUS.IN_PREPARATION],
  [USER_TYPE.DELIVERY]: [ORDER_STATUS.IN_PREPARATION, ORDER_STATUS.ON_THE_WAY],
  [USER_TYPE.MANAGER]: [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.IN_PREPARATION,
    ORDER_STATUS.ON_THE_WAY,
  ],
};

const UPDATE_STATUS = {
  [ORDER_STATUS.PENDING]: ORDER_STATUS.IN_PREPARATION,
  [ORDER_STATUS.IN_PREPARATION]: ORDER_STATUS.ON_THE_WAY,
  [ORDER_STATUS.ON_THE_WAY]: ORDER_STATUS.DELIVERED,
  [ORDER_STATUS.DELIVERED]: ORDER_STATUS.DELIVERED,
};

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private productService: ProductService,
  ) {}

  @Get('/pending')
  async getPendingOrders(@Session() userSession: UserToken) {
    if (userSession.userType === USER_TYPE.CLIENT) {
      throw new BadRequestException(
        'Você não tem permissão para ver pedidos em andamento!',
      );
    }

    return this.orderService.findAll({
      where: {
        status: {
          in: ORDERS_USER_TYPE[userSession.userType],
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

  @Get('/pending/:id')
  async getPendingOrderById(
    @Param('id') id: string,
    @Session() userSession: UserToken,
  ) {
    if (userSession.userType === USER_TYPE.CLIENT) {
      throw new BadRequestException(
        'Você não tem permissão para ver pedidos em andamento!',
      );
    }

    const order = await this.orderService.findOne({
      where: { id },
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

    const products = await this.productService.findByOrder({
      orderId: id,
    });

    return {
      ...order,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.productsOnOrder[0].quantity,
      })),
    };
  }

  @Patch('/pending/:id')
  async updateOrderStatus(
    @Param('id') id: string,
    @Session() userSession: UserToken,
  ) {
    if (userSession.userType === USER_TYPE.CLIENT) {
      throw new BadRequestException(
        'Você não tem permissão para alterar o status do pedido!',
      );
    }

    const order = await this.orderService.findOne({
      where: { id },
      select: {
        status: true,
      },
    });

    if (!order) {
      throw new BadRequestException('Pedido não encontrado!');
    }

    await this.orderService.updateOrder({
      where: { id },
      data: {
        status: UPDATE_STATUS[order.status],
      },
    });

    return {
      status: UPDATE_STATUS[order.status],
      message: 'Status do pedido atualizado com sucesso!',
    };
  }

  @Delete('/pending/:id')
  async cancelOrder(
    @Param('id') id: string,
    @Session() userSession: UserToken,
  ) {
    if (userSession.userType === USER_TYPE.CLIENT) {
      throw new BadRequestException(
        'Você não tem permissão para cancelar o pedido!',
      );
    }

    const order = await this.orderService.findOne({
      where: { id },
      select: {
        status: true,
      },
    });

    if (!order) {
      throw new BadRequestException('Pedido não encontrado!');
    }

    await this.orderService.updateOrder({
      where: { id },
      data: {
        status: ORDER_STATUS.CANCELED,
      },
    });

    return {
      status: ORDER_STATUS.CANCELED,
      message: 'Pedido cancelado com sucesso!',
    };
  }

  @Get()
  getAllOrders(@Session() userSession: UserToken) {
    return this.orderService.findAll({
      where: {
        userId: userSession.id,
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

  @Get('/:id')
  async getOrderById(
    @Param('id') id: string,
    @Session() userSession: UserToken,
  ) {
    const order = await this.orderService.findOne({
      where: { id, userId: userSession.id },
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

    const products = await this.productService.findByOrder({
      orderId: id,
    });

    return {
      ...order,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.productsOnOrder[0].quantity,
      })),
    };
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createOrderSchema))
  async createOrder(
    @Body() orderData: CreateOrderDto,
    @Session() userSession: UserToken,
  ) {
    const order = await this.orderService.createOrder(
      orderData,
      userSession.id,
    );

    return {
      order,
      message: 'Pedido criado com sucesso!',
    };
  }
}
