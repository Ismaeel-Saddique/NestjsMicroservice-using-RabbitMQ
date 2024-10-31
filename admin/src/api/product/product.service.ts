import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.enitiy';
import { CreateProductDto } from 'src/dtos/createProductDto';
import { UpdateProductDto } from 'src/dtos/updateProductDto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }


    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = this.productRepository.create(createProductDto);
        return this.productRepository.save(newProduct);
    }

    async findAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findProductById(id);
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }

    async deleteProduct(id: string) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return "Successfully Deleted"
    }
}