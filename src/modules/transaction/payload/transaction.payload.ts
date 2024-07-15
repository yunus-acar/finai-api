import { TransactionType } from '../enum/transaction.enum';
import { BasePayload } from '../../../shared/graphql/base.payload';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionPayload extends BasePayload {
  @Field()
  description: string;

  @Field(() => Number)
  amount: number;

  @Field()
  date: Date;

  @Field(() => TransactionType)
  type: TransactionType;

  @Field(() => Number)
  userId: number;
}
