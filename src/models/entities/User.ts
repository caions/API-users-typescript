import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { IUser } from '../interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ length: 30 })
  nickname: string;

  @Column()
  address: string;

  @Column({ nullable: true, length: 100 })
  bio: string | null;

  @CreateDateColumn({ name: 'created_at', default: Date.now() })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: Date.now() })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
