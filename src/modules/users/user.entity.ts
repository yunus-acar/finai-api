import { Column, DeleteDateColumn, Entity, OneToMany, Unique } from 'typeorm';

import { BaseEntity } from '../../shared/database/base.entity';
import { Role } from './enum/role.enum';
import { TransactionEntity } from '../transaction/transaction.entity';
import { BudgetEntity } from '../budgets/budget.entity';
import { SavingsGoalEntity } from '../savings-goals/savings-goal.entity';
import { RecommendationEntity } from '../recommendations/recommendation.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column()
  password: string;

  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    enumName: 'user_roles',
  })
  role: Role;

  @Column({
    default: false,
  })
  isAccountDisabled: boolean;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: TransactionEntity[];

  @OneToMany(() => BudgetEntity, (budget) => budget.user)
  budgets: BudgetEntity[];

  @OneToMany(() => SavingsGoalEntity, (savingsGoal) => savingsGoal.user)
  savingsGoals: SavingsGoalEntity[];

  @OneToMany(
    () => RecommendationEntity,
    (recommendation) => recommendation.user,
  )
  recommendations: RecommendationEntity[];

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
