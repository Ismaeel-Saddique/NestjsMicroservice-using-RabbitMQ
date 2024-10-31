import { Module, Options } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/main',
      {autoCreate: true}),
    ProductModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
