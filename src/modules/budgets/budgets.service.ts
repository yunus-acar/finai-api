import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BudgetsRepository } from './budgets.repository';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BudgetPayload } from './payload/budget.payload';

@Injectable()
export class BudgetsService {
  constructor(private repository: BudgetsRepository) {}

  async getBudgetById(id: number, userId: number): Promise<BudgetPayload> {
    const budget = await this.repository.getBudgetById(id);

    if (budget.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to access this budget',
      );
    }

    return budget;
  }

  async getBudgets(userId: number): Promise<BudgetPayload[]> {
    return this.repository.getBudgets(userId);
  }

  async createBudget(budget: CreateBudgetDto): Promise<BudgetPayload> {
    return this.repository.createBudget(budget);
  }

  async updateBudget(id: number, dto: UpdateBudgetDto): Promise<BudgetPayload> {
    await this.getBudgetById(id, dto.userId);

    return this.repository.updateBudget(id, dto);
  }

  async deleteBudget(id: number, userId: number): Promise<Boolean> {
    await this.getBudgetById(id, userId);

    return this.repository.deleteBudget(id);
  }
}
