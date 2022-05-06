import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { Transaction } from './models/transaction.model';
import { TransactionsService } from './transactions.service';

interface TransferDto {
  amount: number;
  actorId: number;
  receiverId?: number;
}

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('/deposit')
  async deposit(@Res() response, @Body() transferDto: TransferDto) {
    const transaction: Transaction = await this.transactionService.deposit(
      transferDto.amount,
      transferDto.actorId,
    );
    return response.status(201).json(transaction);
  }

  @Post('/withdraw')
  async withdraw(@Res() response, @Body() transferDto: TransferDto) {
    try {
      const transaction: Transaction = await this.transactionService.withdraw(
        transferDto.amount,
        transferDto.actorId,
      );
      return response.status(201).json(transaction);
    } catch (error) {
      Logger.log(error);
      return response.status(500).json(error.message);
    }
  }

  @Post('/transfer')
  async transfer(@Res() response, @Body() transferDto: TransferDto) {
    try {
      const transaction: Transaction = await this.transactionService.transfer(
        transferDto.amount,
        transferDto.actorId,
        transferDto.receiverId,
      );
      return response.status(201).json(transaction);
    } catch (error) {
      Logger.log(error);
      return response.status(500).json(error.message);
    }
  }
}
