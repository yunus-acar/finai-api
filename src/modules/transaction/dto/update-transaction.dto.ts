import { IsNotEmpty } from 'class-validator';
import { TransactionType } from '../enum/transaction.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionDto {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  description: string;

  @Field(() => Number)
  @IsNotEmpty()
  amount: number;

  @Field(() => TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @Field(() => Date)
  @IsNotEmpty()
  date: Date;
}
