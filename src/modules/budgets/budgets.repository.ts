import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BudgetEntity } from './budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsRepository extends Repository<BudgetEntity> {
  constructor(private dataSource: DataSource) {
    super(BudgetEntity, dataSource.createEntityManager());
  }

  async getBudgetById(id: number): Promise<BudgetEntity> {
    return this.findOne({ where: { id } });
  }

  async getBudgets(userId: number): Promise<BudgetEntity[]> {
    return this.find({ where: { userId } });
  }

  async createBudget(budget: CreateBudgetDto): Promise<BudgetEntity> {
    return this.save(budget);
  }

  async updateBudget(id: number, dto: UpdateBudgetDto): Promise<BudgetEntity> {
    const budget = await this.getBudgetById(id);

    return this.save({ ...budget, ...dto });
  }

  async deleteBudget(id: number): Promise<boolean> {
    const budget = await this.getBudgetById(id);

    await this.remove(budget);

    return true;
  }
}
