import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Transaction } from 'typeorm';
import { TransactionService } from './transactions.service';
import { TransactionPayload } from './payload/transaction.payload';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { UserEntity } from '../users/user.entity';
import { PaginatedTransactionPayload } from './payload/paginated-transaction.payload';
import { GetTransactionDto } from './dto/get-transaction.dto';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => TransactionPayload)
  async createTransaction(
    @Args('data') data: CreateTransactionDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.transactionService.createTransaction(data, user.id);
  }

  @UseGuards(AuthGuard)
  @Query(() => PaginatedTransactionPayload)
  async getTransactions(
    @Args() dto: GetTransactionDto,
    @CurrentUser() user: UserEntity,
  ) {
    dto.userId = user.id;

    return this.transactionService.getTransactions(dto);
  }

  @UseGuards(AuthGuard)
  @Query(() => TransactionPayload)
  async getTransactionById(
    @Args('id') id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.transactionService.getTransactionById(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TransactionPayload)
  async updateTransaction(
    @Args('id') id: number,
    @Args('data') data: CreateTransactionDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.transactionService.updateTransaction(id, data, user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteTransaction(
    @Args('id') id: number,
    @CurrentUser() user: UserEntity,
  ): Promise<boolean> {
    return this.transactionService.deleteTransaction(id, user.id);
  }
}
