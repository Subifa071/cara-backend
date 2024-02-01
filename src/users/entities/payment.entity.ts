import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  number: string;

  @Column('varchar')
  expiresAt: string;

  @Column('integer')
  cvv: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.payment_methods)
  user: User;
}
