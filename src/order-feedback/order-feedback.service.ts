import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderFeedbackDto } from './order-feedback.dto';

@Injectable()
export class OrderFeedbackService {
  constructor(private prisma: PrismaService) {}

  async createOrderFeedback(feedback: CreateOrderFeedbackDto, orderId: string) {
    return this.prisma.orderFeedback.create({
      data: {
        feedbackComment: feedback.feedbackComment,
        feedbackStars: feedback.feedbackStars,
        deliveryFeedbackComment: feedback.deliveryFeedbackComment,
        deliveryFeedbackStars: feedback.deliveryFeedbackStars,
        order: {
          connect: {
            id: orderId,
          },
        },
      },
    });
  }

  async getOrderFeedback(orderId: string) {
    return this.prisma.orderFeedback.findUnique({
      where: {
        orderId,
      },
    });
  }
}
