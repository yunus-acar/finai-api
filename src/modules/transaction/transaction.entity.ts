import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/database/base.entity';
import { TransactionType } from './enum/transaction.enum';
import { UserEntity } from '../users/user.entity';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    enumName: 'transaction_type',
  })
  type: TransactionType;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  user: UserEntity;

  @Column()
  userId: number;
}
