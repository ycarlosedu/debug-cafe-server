import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  Session,
  UsePipes,
} from '@nestjs/common';
import { OrderFeedbackService } from './order-feedback.service';
import { OrderService } from 'src/order/order.service';
import { ZodValidationPipe } from 'src/pipes/zodValidation';
import {
  CreateOrderFeedbackDto,
  createOrderFeedbackSchema,
} from './order-feedback.dto';
import { UserToken } from 'src/auth/auth.dto';

@Controller('order-feedback')
export class OrderFeedbackController {
  constructor(
    private readonly orderFeedbackService: OrderFeedbackService,
    private orderService: OrderService,
  ) {}
  private readonly logger = new Logger(OrderFeedbackController.name);

  @Post()
  @UsePipes(new ZodValidationPipe(createOrderFeedbackSchema))
  async createOrderFeedback(
    @Body() feedback: CreateOrderFeedbackDto,
    @Session() userSession: UserToken,
  ) {
    const order = await this.orderService.findOne({
      where: {
        id: feedback.orderId,
        userId: userSession.id,
      },
    });

    if (!order) {
      throw new BadRequestException('Pedido não encontrado');
    }

    if (order.status !== 'DELIVERED') {
      throw new BadRequestException('O pedido deve estar entregue');
    }

    this.logger.log(
      `Feedback criado para o pedido ${feedback.orderId}, por ${userSession.email}`,
    );

    return this.orderFeedbackService.createOrderFeedback(
      feedback,
      feedback.orderId,
    );
  }
}
