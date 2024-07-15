import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { BaseEntity } from '../../shared/database/base.entity';

@Entity('savings_goals')
export class SavingsGoalEntity extends BaseEntity {
  @Column()
  name: string;

  @Column('float')
  targetAmount: number;

  @Column('float')
  currentAmount: number;

  @Column('float', { nullable: true })
  actualAmount: number;

  @Column()
  targetDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.savingsGoals)
  user: UserEntity;

  @Column()
  userId: number;
}
