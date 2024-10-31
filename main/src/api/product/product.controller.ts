import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dto/updateProduct.dto';
import { ProductDocument } from 'src/schemas/product.schema';
import { UpdateProductDto } from 'src/dto/createProduct.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
        constructor(private readonly productService: ProductService) {}

        //@Post('create')
        @EventPattern('product_created')
        async create(@Body() createProductDto: CreateProductDto): Promise<ProductDocument> {
          return this.productService.create(createProductDto);
        }
        
        @EventPattern('hello')
        async hello(@Payload() data: string){
          console.log(data)
        }

        @Get('all')
        async findAll(): Promise<ProductDocument[]> {
          return this.productService.findAll();
        }
    
        @Get(':id')
        async findOne(@Param('id') id: string): Promise<ProductDocument> {
          return this.productService.findOne(id);
        }
      
        //@Patch(':id')
        @EventPattern('product_updated')
        async update(
          @Param('id') id: string,
          @Body() updateProductDto: UpdateProductDto,
        ): Promise<ProductDocument> {
          return this.productService.update(id, updateProductDto);
        }
    
        //@Delete(':id')
        @EventPattern('product_deleted')
        async delete(@Param('id') id: string): Promise<ProductDocument> {
          return this.productService.delete(id);
        }

         
      }
