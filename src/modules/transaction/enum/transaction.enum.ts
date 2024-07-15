import { registerEnumType } from '@nestjs/graphql';

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'Type of transaction',
});
