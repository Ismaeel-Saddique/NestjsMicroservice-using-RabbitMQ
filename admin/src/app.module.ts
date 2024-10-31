import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './api/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.enitiy';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.PGHOST,
        port: +process.env.PGPORT, 
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD ,
        database: process.env.PGDATABASE,
        entities: [Product],
        synchronize: true, 
      }),
    }),ProductModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
