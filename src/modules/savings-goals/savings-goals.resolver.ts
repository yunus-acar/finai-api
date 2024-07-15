import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GoalPayload } from './payload/goal.payload';
import { SavingsGoalsService } from './savings-goals.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { UserEntity } from '../users/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { AddActualAmountDto } from './dto/add-actual-amount.dto';

@Resolver(() => GoalPayload)
export class SavingsGoalsResolver {
  constructor(private readonly goalService: SavingsGoalsService) {}

  @UseGuards(AuthGuard)
  @Query(() => GoalPayload)
  async getGoalById(
    @Args('id') id: number,
    @CurrentUser() user: UserEntity,
  ): Promise<GoalPayload> {
    return this.goalService.getGoalById(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [GoalPayload])
  async getGoals(@CurrentUser() user: UserEntity): Promise<GoalPayload[]> {
    return this.goalService.getGoals(user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GoalPayload)
  async createGoal(
    @Args('data') dto: CreateGoalDto,
    @CurrentUser() user: UserEntity,
  ): Promise<GoalPayload> {
    dto.userId = user.id;

    return this.goalService.createGoal(dto);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GoalPayload)
  async updateGoal(
    @Args('id') id: number,
    @Args('data') dto: CreateGoalDto,
    @CurrentUser() user: UserEntity,
  ): Promise<GoalPayload> {
    dto.userId = user.id;

    return this.goalService.updateGoal(id, dto);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteGoal(
    @Args('id') id: number,
    @CurrentUser() user: UserEntity,
  ): Promise<Boolean> {
    return this.goalService.deleteGoal(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GoalPayload)
  async addActualAmount(
    @Args('data') dto: AddActualAmountDto,
    @CurrentUser() user: UserEntity,
  ): Promise<GoalPayload> {
    dto.userId = user.id;
    return this.goalService.addActualAmount(dto);
  }
}
