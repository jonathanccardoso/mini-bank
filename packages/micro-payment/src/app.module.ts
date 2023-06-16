import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account, Transaction, User } from './shared/entities';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/configuration/configuration';
import { ConfigurationService } from './core/configuration/configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      models: [User, Account, Transaction],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User, Account, Transaction]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-client',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'kafka-group',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    ConfigurationService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class AppModule {}
