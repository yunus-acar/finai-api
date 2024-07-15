import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SavingsGoalEntity } from './savings-goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class SavingsGoalsRepository extends Repository<SavingsGoalEntity> {
  constructor(private dataSource: DataSource) {
    super(SavingsGoalEntity, dataSource.createEntityManager());
  }

  async getGoalById(id: number): Promise<SavingsGoalEntity> {
    return this.findOne({ where: { id } });
  }

  async getGoals(userId: number): Promise<SavingsGoalEntity[]> {
    return this.find({ where: { userId } });
  }

  async createGoal(
    goal: CreateGoalDto,
    actualAmount?: number,
  ): Promise<SavingsGoalEntity> {
    return this.save({ ...goal, actualAmount });
  }

  async updateGoal(id: number, dto: UpdateGoalDto): Promise<SavingsGoalEntity> {
    const goal = await this.getGoalById(id);

    return this.save({ ...goal, ...dto });
  }

  async deleteGoal(id: number): Promise<boolean> {
    const goal = await this.getGoalById(id);

    await this.remove(goal);

    return true;
  }
}
