import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SavingsGoalsRepository } from './savings-goals.repository';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalPayload } from './payload/goal.payload';
import { AddActualAmountDto } from './dto/add-actual-amount.dto';
import { RabbitMQService } from '../../shared/rabbitmq/rabbitmq.service';

import { faker } from '@faker-js/faker';
import { UsersService } from '../users/users.service';
import { min } from 'class-validator';

@Injectable()
export class SavingsGoalsService {
  constructor(
    private repository: SavingsGoalsRepository,
    private queueService: RabbitMQService,
    private userService: UsersService,
  ) {}

  async getGoalById(id: number, userId: number): Promise<GoalPayload> {
    const goal = await this.repository.getGoalById(id);

    if (goal.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to access this savings goal',
      );
    }

    return goal;
  }

  async getGoals(userId: number): Promise<GoalPayload[]> {
    const users = await this.userService.getUsers(110, 0);

    users.users.forEach(async (user) => {
      for (let index = 0; index < 100; index++) {
        const currentAmount = Number(faker.finance.amount());
        const actualAmount = Number(faker.finance.amount());
        await this.createFullGoal(
          {
            currentAmount: currentAmount,
            targetAmount: Number(faker.finance.amount({ min: currentAmount })),
            userId: user.id,
            name: faker.random.word(),
            targetDate: faker.date.future(),
          },
          actualAmount,
        );
      }
    });
    return this.repository.getGoals(userId);
  }

  async createGoal(goal: CreateGoalDto): Promise<GoalPayload> {
    const createdGoal = await this.repository.createGoal(goal);

    this.queueService.emit('calculate_goals_recommendation', goal);

    return createdGoal;
  }

  async createFullGoal(
    goal: CreateGoalDto,
    actualAmount: number,
  ): Promise<GoalPayload> {
    const createdGoal = await this.repository.createGoal(goal, actualAmount);

    this.queueService.emit('calculate_goals_recommendation', {
      ...goal,
      actualAmount,
    });

    return createdGoal;
  }

  async updateGoal(id: number, dto: UpdateGoalDto): Promise<GoalPayload> {
    await this.getGoalById(id, dto.userId);

    const updatedGoal = await this.repository.updateGoal(id, dto);

    this.queueService.emit('calculate_goals_recommendation', {
      userId: dto.userId,
    });

    return updatedGoal;
  }

  async deleteGoal(id: number, userId: number): Promise<Boolean> {
    await this.getGoalById(id, userId);

    const deletedBudget = await this.repository.deleteGoal(id);

    this.queueService.emit('calculate_goals_recommendation', {
      userId,
    });

    return deletedBudget;
  }

  async addActualAmount({
    id,
    amount,
    userId,
  }: AddActualAmountDto): Promise<GoalPayload> {
    const goal = await this.getGoalById(id, userId);

    goal.actualAmount += amount;

    const updatedGoal = await this.repository.updateGoal(id, goal);

    this.queueService.emit('calculate_goals_recommendation', {
      userId,
    });

    return updatedGoal;
  }
}
