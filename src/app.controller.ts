import { Controller, Get, Logger } from '@nestjs/common';
import { Public } from './constants';

@Controller('app')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Public()
  @Get('health-check')
  healthCheck() {
    this.logger.log('Endpoint de health check chamado com sucesso!');
    return {
      message: 'A api está no ar!',
    };
  }
}
