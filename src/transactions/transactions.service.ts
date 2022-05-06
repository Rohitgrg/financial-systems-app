import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { Repository, UpdateResult } from 'typeorm';
import { Transaction } from './models/transaction.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private userService: UsersService,
  ) {}

  async deposit(amount: number, userId: number): Promise<Transaction> {
    const user: User = await this.userService.findOneUser(userId);
    const newBalance: number = user.balance + amount;
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.actorId = user;
    transaction.type = 'deposit';
    await this.userService.updateUser(userId, {
      balance: newBalance,
    });
    return this.transactionsRepository.save(transaction);
  }

  async withdraw(amount: number, userId: number): Promise<Transaction> {
    const user: User = await this.userService.findOneUser(userId);
    if (user.balance < amount) throw new Error('Not enough money');

    const newBalance: number = user.balance - amount;
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.actorId = user;
    transaction.type = 'withdraw';
    await this.userService.updateUser(userId, {
      balance: newBalance,
    });
    return await this.transactionsRepository.save(transaction);
  }

  async transfer(amount: number, actorId: number, receiverId?: number) {
    const sender: User = await this.userService.findOneUser(actorId);
    const receiver: User = await this.userService.findOneUser(receiverId);
    const commission: number = amount * 0.02;
    const senderBalance: number = sender.balance - (amount + commission);
    const receiverBalance: number = receiver.balance + amount;
    if (sender.balance < amount + commission)
      throw new Error('Not enough money to transfer');
    const transaction = new Transaction();
    transaction.amount = amount + commission;
    transaction.actorId = sender;
    transaction.receiverId = receiver;
    transaction.type = 'transfer';

    await this.userService.updateUser(actorId, {
      balance: senderBalance,
    });
    await this.userService.updateUser(receiverId, {
      balance: receiverBalance,
    });
    return this.transactionsRepository.save(transaction);
  }
}
