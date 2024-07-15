import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { BaseEntity } from '../../shared/database/base.entity';

@Entity('recommendations')
export class RecommendationEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column('date')
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.recommendations)
  user: UserEntity;

  @Column()
  userId: number;
}
