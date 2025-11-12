import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // <-- Importante
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // se outro módulo precisar
})
export class ProductsModule {}