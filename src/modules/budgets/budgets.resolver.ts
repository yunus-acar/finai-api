import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BudgetPayload } from './payload/budget.payload';
import { BudgetsService } from './budgets.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { UserEntity } from '../users/user.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Resolver(() => BudgetPayload)
export class BudgetsResolver {
  constructor(private readonly budgetService: BudgetsService) {}

  @UseGuards(AuthGuard)
  @Query(() => BudgetPayload)
  async getBudgetById(
    @Args('id') id: number,
    @CurrentUser() user: UserEntity,
  ): Promise<BudgetPayload> {
    return this.budgetService.getBudgetById(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [BudgetPayload])
  async getBudgets(@CurrentUser() user: UserEntity): Promise<BudgetPayload[]> {
    return this.budgetService.getBudgets(user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BudgetPayload)
  async createBudget(
    @Args('data') dto: CreateBudgetDto,
    @CurrentUser() user: UserEntity,
  ): Promise<BudgetPayload> {
    dto.userId = user.id;

    return this.budgetService.createBudget(dto);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BudgetPayload)
  async updateBudget(
    @Args('id') id: number,
    @Args('data') dto: CreateBudgetDto,
    @CurrentUser() user: UserEntity,
  ): Promise<BudgetPayload> {
    dto.userId = user.id;

    return this.budgetService.updateBudget(id, dto);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteBudget(
    @Args('id') id: number,
    @CurrentUser() user: UserEntity,
  ): Promise<Boolean> {
    return this.budgetService.deleteBudget(id, user.id);
  }
}
