import { Field, ObjectType } from '@nestjs/graphql';
import { BasePayload } from '../../../shared/graphql/base.payload';

@ObjectType()
export class GoalPayload extends BasePayload {
  @Field()
  name: string;

  @Field(() => Number)
  targetAmount: number;

  @Field(() => Number)
  currentAmount: number;

  @Field(() => Date)
  targetDate: Date;

  @Field(() => Number)
  userId: number;

  @Field(() => Number, { nullable: true })
  actualAmount: number | null;
}
