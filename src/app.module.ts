import { Module } from '@nestjs/common';
import { GraphQLModule, GraphQLDefinitionsFactory, GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { Product } from './products/product.entity';
import { ProductResolver } from './products/product.resolver';
import { ProductService } from './products/product.service';


@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: {
        orphanedTypes: [Product],
      },
      // typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      // },
    })
  ],
  controllers: [],
  providers: [PrismaService, ProductResolver, ProductService],
})
export class AppModule { }
