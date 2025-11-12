import { Entity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @VersionColumn()
  version: number;

  @OneToMany(() => Order, order => order.product)
  orders: Order[];
}
