import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) { }

  async findAllProducts() {
    return await this.prismaService.products.findMany({});
  }

  async findOneProduct(id: number): Promise<Product> {
    return await this.prismaService.products.findUnique({
      where: { id: id }
    });
  }

  async createProduct(data) {
    return this.prismaService.products.create({
      data: { product: data.product }
    });
  }

  async updateProduct(data) {
    return this.prismaService.products.update({
      where: { id: data.id },
      data: { product: data.product }
    });
  }

  async deleteProduct(id) {
    return this.prismaService.products.delete({
      where: { id: id },
    });
  }
}
