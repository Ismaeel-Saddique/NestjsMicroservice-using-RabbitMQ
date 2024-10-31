import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/dtos/createProductDto';
import { Product } from 'src/entities/product.enitiy';
import { UpdateProductDto } from 'src/dtos/updateProductDto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService,
      @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
    ) {}

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productService.createProduct(createProductDto);
    this.client.emit('product_created', product);
    return product;
  }

  @Get('all')
  async findAllProducts(): Promise<Product[]> {
    this.client.emit('hello', 'hello from rabbit')
    return this.productService.findAllProducts();
  }

  @Get(':id')
  async findProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productService.updateProduct(id, updateProductDto);
    this.client.emit('product_updated', product);
    return product

  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    this.client.emit("Product_deleted", id);
    return this.productService.deleteProduct(id);
  }
}
