import 'reflect-metadata'
import { ObjectType, Field, ID, InputType, InterfaceType, Directive } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

@ObjectType()
@Directive('@key(fields: "id")')
export class Product {
  @Field((type) => ID)
  id: number

  @Field((type) => String)
  @IsNotEmpty()
  product: string
}

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  product: string
}

@InputType()
export class UpdateProductInput {
  @Field()
  id: number
  
  @Field()
  @IsNotEmpty()
  product: string
}
