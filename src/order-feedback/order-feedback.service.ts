import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderFeedbackDto } from './order-feedback.dto';

@Injectable()
export class OrderFeedbackService {
  constructor(private prisma: PrismaService) {}

  async createOrderFeedback(feedback: CreateOrderFeedbackDto, orderId: string) {
    return this.prisma.orderFeedback.create({
      data: {
        comment: feedback.comment,
        stars: feedback.stars,
        deliveryComment: feedback.deliveryComment,
        deliveryStars: feedback.deliveryStars,
        order: {
          connect: {
            id: orderId,
          },
        },
      },
      select: {
        comment: true,
        stars: true,
        deliveryComment: true,
        deliveryStars: true,
      },
    });
  }

  async getOrderFeedback(orderId: string) {
    return this.prisma.orderFeedback.findUnique({
      where: {
        orderId,
      },
      select: {
        comment: true,
        stars: true,
        deliveryComment: true,
        deliveryStars: true,
      },
    });
  }
}
