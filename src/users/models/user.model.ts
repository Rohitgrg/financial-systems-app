import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Transaction} from '../../transactions/models/transaction.model'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default: 0, scale: 2 , type:"float"})
  balance: number;

  @OneToMany(type => Transaction, transaction => transaction.actorId)
  transactions: Transaction[];
}