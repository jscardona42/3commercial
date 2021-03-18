import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { GqlAuthGuard } from './auth/authguard.guard';
import { CreateProductInput, UpdateProductInput, Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(() => [Product])
  // @UseGuards(GqlAuthGuard)
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Query((returns) => Product)
  @UseGuards(GqlAuthGuard)
  findOneProduct(@Args('id') id: number): Promise<Product> {
    return this.productService.findOneProduct(id);
  }

  @Mutation(returns => Product)
  createProduct(
    @Args("data") data: CreateProductInput,
    @Context() ctx): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Mutation(returns => Product)
  updateProduct(
    @Args("data") data: UpdateProductInput,
    @Context() ctx): Promise<Product> {
    return this.productService.updateProduct(data);
  }

  @Mutation(returns => Product)
  deleteProduct(
    @Args("id") id: number,
    @Context() ctx): Promise<Product> {
    return this.productService.deleteProduct(id);
  }


}