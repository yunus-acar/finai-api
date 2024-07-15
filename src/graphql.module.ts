import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transactions.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { SavingsGoalsModule } from './modules/savings-goals/savings-goals.module';
import { RabbitMQModule } from './shared/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TransactionModule,
    BudgetsModule,
    SavingsGoalsModule,
  ],
  exports: [],
})
export class GraphqlModule {}
