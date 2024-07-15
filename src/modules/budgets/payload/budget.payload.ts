import { Field, ObjectType } from '@nestjs/graphql';
import { BasePayload } from '../../../shared/graphql/base.payload';

@ObjectType()
export class BudgetPayload extends BasePayload {
  @Field()
  category: string;

  @Field(() => Number)
  amount: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Number)
  userId: number;
}
