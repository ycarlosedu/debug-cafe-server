import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ERROR, IS_AVAILABLE_TO_GUEST_KEY, IS_PUBLIC_KEY } from 'src/constants';
import { UserToken } from './auth.dto';
import { USER_TYPE } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException(ERROR.UNAUTHORIZED);

    const isAvailableToGuest = this.reflector.getAllAndOverride<boolean>(
      IS_AVAILABLE_TO_GUEST_KEY,
      [context.getHandler(), context.getClass()],
    );

    const payload: UserToken = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    if (!payload) throw new UnauthorizedException(ERROR.UNAUTHORIZED);

    if (!isAvailableToGuest && payload.userType === USER_TYPE.GUEST)
      throw new BadRequestException(ERROR.NOT_AVAILABLE_TO_GUEST);

    request.session = payload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
