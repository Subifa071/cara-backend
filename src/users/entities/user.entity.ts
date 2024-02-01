import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USER_TYPE } from '../enums/user.enum';
import { Password } from './password.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  phoneNumber: string;

  @Column('varchar')
  email: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @Column('boolean', { default: false })
  suspended: boolean;

  @Column('enum', { enum: USER_TYPE })
  type: USER_TYPE;

  @OneToMany((type) => Password, (password) => password.user)
  passwords: Password[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
