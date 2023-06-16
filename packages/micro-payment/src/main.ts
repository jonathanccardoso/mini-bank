import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }));

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      // producer: {
      //   retry: {
      //     initialRetryTime: 100,
      //     retries: 3,
      //   },
      // },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
