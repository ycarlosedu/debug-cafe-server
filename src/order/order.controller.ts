import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import { CreateOrderDto, createOrderSchema } from './order.dto';
import { OrderService } from './order.service';
import { UserToken } from 'src/auth/auth.dto';
import { ProductService } from 'src/product/product.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private productService: ProductService,
  ) {}

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
