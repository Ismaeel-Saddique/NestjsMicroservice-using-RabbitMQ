import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://xuzmbixk:aGzDeVGMPhtQOvAfTubcU-ruX-RCUFh_@sparrow.rmq.cloudamqp.com/xuzmbixk'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
  console.log('Microservice is listening');
}

bootstrap();
