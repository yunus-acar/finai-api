import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TransactionEntity } from './transaction.entity';

import { TransactionType } from './enum/transaction.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PageInfoPayload } from '../../shared/pagination/page-info.payload';
import { PaginatedTransactionPayload } from './payload/paginated-transaction.payload';
import { GetTransactionDto } from './dto/get-transaction.dto';

@Injectable()
export class TransactionRepository extends Repository<TransactionEntity> {
  constructor(private dataSource: DataSource) {
    super(TransactionEntity, dataSource.createEntityManager());
  }

  async getTransactionById(id: number): Promise<TransactionEntity> {
    const transaction = await this.findOne({ where: { id } });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async createTransaction(
    transaction: CreateTransactionDto,
    userId: number,
  ): Promise<TransactionEntity> {
    return this.save({ ...transaction, userId });
  }

  async getTransactions({
    type,
    after,
    before,
    first,
    last,
    skip,
    userId,
  }: GetTransactionDto): Promise<PaginatedTransactionPayload> {
    let query = this.createQueryBuilder('transaction')
      .where('transaction.userId = :userId', { userId })
      .orderBy('transaction.date', 'DESC')
      .addOrderBy('transaction.id', 'ASC');

    if (type) {
      query = query.andWhere('transaction.type = :type', { type });
    }

    if (after) {
      const [date, id] = after.split('_');
      const afterDate = new Date(date);

      query = query.andWhere(
        '(transaction.date > :afterDate OR (transaction.date = :afterDate AND transaction.id > :afterId))',
        { afterDate, afterId: id },
      );
    }

    if (before) {
      const [date, id] = before.split('_');
      const beforeDate = new Date(date);

      query = query.andWhere(
        '(transaction.date < :beforeDate OR (transaction.date = :beforeDate AND transaction.id < :beforeId))',
        { beforeDate, beforeId: id },
      );
    }

    if (first) {
      query = query.take(first + 1);
    } else if (last) {
      query = query.take(last + 1);
    }

    const transactions = await query.getMany();

    const edges = transactions.slice(0, first || last).map((transaction) => ({
      cursor: `${transaction.date.toISOString()}_${transaction.id}`,
      node: transaction,
    }));

    const hasNextPage = transactions.length > (first || last);
    const hasPreviousPage = !!(!!before || (skip && skip > 0));

    const pageInfo: PageInfoPayload = {
      endCursor: edges.length ? edges[edges.length - 1].cursor : null,
      hasNextPage,
      hasPreviousPage,
      startCursor: edges.length ? edges[0].cursor : null,
    };

    return {
      pageInfo,
      totalCount: transactions.length,
      edges,
    };
  }

  async updateTransaction(
    id: number,
    transaction: UpdateTransactionDto,
  ): Promise<TransactionEntity> {
    const transactionToUpdate = await this.getTransactionById(id);

    return this.save({ ...transactionToUpdate, ...transaction });
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const transaction = await this.getTransactionById(id);

    await this.delete(transaction.id);

    return true;
  }

  async getCount(type: TransactionType): Promise<number> {
    return this.count({ where: { type } });
  }

  async getUserTransactions(userId: number): Promise<TransactionEntity[]> {
    return this.find({ where: { userId } });
  }
}
