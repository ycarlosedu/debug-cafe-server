import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ChangeUserTypeDto, SignInDto, SignUpDto, UserToken } from './auth.dto';
import { User, USER_TYPE } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ERROR } from 'src/constants';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async createToken(user: User): Promise<string> {
    const payload: UserToken = {
      id: user.id,
      email: user.email,
      userType: user.userType,
    };
    return this.jwtService.signAsync(payload);
  }

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    const isMatch = await bcrypt.compare(password, user?.password || '');
    if (!user || !isMatch) {
      this.logger.error(
        'Tentativa de Login. Credenciais inválidas para o usuário: ' + email,
      );
      throw new UnauthorizedException(ERROR.INVALID_CREDENTIALS);
    }
    this.logger.log('Login realizado com sucesso para o usuário: ' + email);

    return {
      user: {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        userType: user.userType,
      },
      token: await this.createToken(user),
    };
  }

  async signUp({ email, fullName, phone, password }: SignUpDto): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user) {
      this.logger.error('Tentaiva de Cadastro. E-mail já cadastrado: ' + email);
      throw new UnauthorizedException(ERROR.EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await this.usersService.createUser({
      email,
      password: hashedPassword,
      fullName,
      phone,
    });

    this.logger.log('Cadastro realizado com sucesso para o usuário: ' + email);
    return {
      user: {
        email: userCreated.email,
        fullName: userCreated.fullName,
        phone: userCreated.phone,
        userType: userCreated.userType,
      },
      token: await this.createToken(userCreated),
    };
  }

  async createGuest() {
    const user = {
      email: 'convidado@debug.cafe',
      fullName: 'Convidado',
      phone: '',
      userType: USER_TYPE.GUEST,
    } as User;
    return {
      user,
      token: await this.createToken(user),
    };
  }

  async changeUserType(
    { userType, password }: ChangeUserTypeDto,
    { id }: UserToken,
  ): Promise<any> {
    const userTypeRequested = await this.prisma.userTypePasswords.findUnique({
      where: { userType },
    });
    if (!userTypeRequested) {
      throw new BadRequestException(ERROR.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, userTypeRequested.password);
    if (!isMatch) {
      throw new BadRequestException(ERROR.INVALID_CREDENTIALS);
    }

    const userUpdated = await this.usersService.updateUser({
      where: { id },
      data: { userType },
    });

    return {
      user: {
        email: userUpdated.email,
        fullName: userUpdated.fullName,
        phone: userUpdated.phone,
        userType: userUpdated.userType,
      },
      token: await this.createToken(userUpdated),
    };
  }
}
