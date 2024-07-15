import { Module } from '@nestjs/common';
import { BudgetsRepository } from './budgets.repository';
import { BudgetsService } from './budgets.service';
import { BudgetsResolver } from './budgets.resolver';

@Module({
  imports: [],
  providers: [BudgetsRepository, BudgetsService, BudgetsResolver],
})
export class BudgetsModule {}
