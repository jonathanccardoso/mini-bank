import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { TransactionSuccessDto } from './dto/payment-success.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('topic-transaction')
  async consumerTransaction(@Payload() body: TransactionSuccessDto) {
    return this.appService.processTransaction(body);
  }
}
