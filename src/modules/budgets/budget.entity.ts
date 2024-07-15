import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { BaseEntity } from '../../shared/database/base.entity';

@Entity('budgets')
export class BudgetEntity extends BaseEntity {
  @Column()
  category: string;

  @Column('float')
  amount: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.budgets)
  user: UserEntity;

  @Column()
  userId: number;
}
