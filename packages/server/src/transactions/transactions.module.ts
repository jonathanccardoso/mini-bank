import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]),
    AccountsModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class TransactionsModule {}
