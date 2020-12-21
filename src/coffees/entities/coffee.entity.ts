import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // โดย default ของชื่อตาราง จะเป็นชื่อ class ที่เป็น lowercase(ในที่นี้ชื่อว่า coffee) สามารถกำหนดชื่อตารางเองได้โดยส่งเป็น parameter ของ Entity Decorator
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
  @ManyToMany(
    (type) => Flavor,
    (flavor) => flavor.coffees, // what is "coffee" within the Flavor Entity
    {
      cascade: true, // ['Insert']
    },
  ) // 👈
  flavors: Flavor[];
}
