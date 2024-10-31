import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.enitiy';
import { ClientsModule, Transport  } from '@nestjs/microservices';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://xuzmbixk:aGzDeVGMPhtQOvAfTubcU-ruX-RCUFh_@sparrow.rmq.cloudamqp.com/xuzmbixk'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
