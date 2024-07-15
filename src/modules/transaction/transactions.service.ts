import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TransactionRepository } from './transactions.repository';
import { TransactionPayload } from './payload/transaction.payload';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { GetTransactionDto } from './dto/get-transaction.dto';
import { RabbitMQService } from 'src/shared/rabbitmq/rabbitmq.service';

@Injectable()
export class TransactionService {
  constructor(
    private repository: TransactionRepository,
    private queueService: RabbitMQService,
  ) {}

  async getTransactionById(
    id: number,
    userId: number,
  ): Promise<TransactionPayload> {
    const transaction = await this.repository.getTransactionById(id);

    if (transaction.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to view this transaction',
      );
    }

    return transaction;
  }

  async createTransaction(
    transaction: CreateTransactionDto,
    userId: number,
  ): Promise<TransactionPayload> {
    const createdTransaction = await this.repository.createTransaction(
      transaction,
      userId,
    );

    this.queueService.emit('calculate_transaction_recommendation', {
      userId,
      ...transaction,
    });

    return createdTransaction;
  }

  async getTransactions(dto: GetTransactionDto) {
    return this.repository.getTransactions(dto);
  }

  async updateTransaction(
    id: number,
    dto: UpdateTransactionDto,
    userId: number,
  ): Promise<TransactionPayload> {
    await this.getTransactionById(id, userId);

    const updatedTransaction = await this.repository.updateTransaction(id, dto);
    this.queueService.send('calculate_transaction_recommendation', {
      userId,
      ...dto,
    });

    return updatedTransaction;
  }

  async deleteTransaction(id: number, userId: number): Promise<boolean> {
    await this.getTransactionById(id, userId);

    const deletedTransaction = await this.repository.deleteTransaction(id);
    this.queueService.send('calculate_transaction_recommendation', {
      userId,
    });

    return deletedTransaction;
  }
}
