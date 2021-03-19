import { Module } from '@nestjs/common';
import { GraphQLModule, GraphQLDefinitionsFactory, GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { Product } from './products/product.entity';
import { ProductResolver } from './products/product.resolver';
import { ProductService } from './products/product.service';
const fetch = require('node-fetch');

const apiUrl = "http://localhost:3003";
const headers = { 'Content-Type': 'application/json' }
const MyProviders = [PrismaService, ProductResolver, ProductService]


@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: {
        orphanedTypes: [Product],
      },
    })
  ],
  controllers: [],
  providers: MyProviders,
})
export class AppModule {
  constructor() {
    setTimeout(() => {
      this.saveProviders();
    }, 300);
  }

  public saveProviders() {
    for (const clsname of MyProviders) {
      var TMPmethods = Object.getOwnPropertyNames(clsname.prototype).filter(
        item => item !== 'constructor'
      );
      fetch(`${apiUrl}/admin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ TMPmethods, clsname: clsname.name })
      }).then(response => response.json())
        .then(response => console.log(response))
    }
  }
}
