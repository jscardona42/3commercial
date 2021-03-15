import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateProductInput, UpdateProductInput, Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(() => [Product], { name: 'products' })
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Query((returns) => Product)
  findOneProduct(@Args('id') id: number): Promise<Product> {
    return this.productService.findOneProduct(id);
  }

  @Mutation(returns => Product, { description: "Create a new product" })
  createProduct(
    @Args("data") data: CreateProductInput,
    @Context() ctx): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Mutation(returns => Product, { description: "Update a product" })
  updateProduct(
    @Args("data") data: UpdateProductInput,
    @Context() ctx): Promise<Product> {
    return this.productService.updateProduct(data);
  }

  @Mutation(returns => Product, { description: "Delete a product" })
  deleteProduct(
    @Args("id") id: number,
    @Context() ctx): Promise<Product> {
    return this.productService.deleteProduct(id);
  }


}