import { User } from 'src/users/models/user.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ scale: 2, type: 'float' })
  amount: number;

  @Column()
  type: string;

  @ManyToOne((type) => User, (user) => user.id)
  actorId: User;

  @ManyToOne((type) => User, (user) => user.id)
  receiverId: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
