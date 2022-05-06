import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/user.module';
import { UsersService } from 'src/users/users.service';
import { Transaction } from './models/transaction.model';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]),UserModule],
  controllers: [ TransactionsController],
  providers: [ TransactionsService],
})
export class TransactionModule {}
