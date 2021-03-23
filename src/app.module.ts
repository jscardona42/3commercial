import { Module } from '@nestjs/common';
import { GraphQLModule, GraphQLDefinitionsFactory, GraphQLFederationModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
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
    JwtModule.register({
      secret: "topSecret",
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    // GraphQLModule.forRoot({
    //   cors: {
    //     origin: '*',
    //     credentials: true,
    //   },
    //   autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    //   context: ({ req }) => ({ req })
    // })
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: {
        orphanedTypes: [Product],
      },
      cors: {
        origin: '*',
        credentials: true,
      },
      context: ({ req, res, context }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';

        return { token };
      },
    }
    )
  ],
  controllers: [],
  providers: MyProviders,
})
export class AppModule {
  constructor() {
    this.saveProviders();
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
