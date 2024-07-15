import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from '../../../shared/pagination/pagination.args';
import { TransactionType } from '../enum/transaction.enum';

@ArgsType()
export class GetTransactionDto extends PaginationArgs {
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => Number, { nullable: true })
  userId: number;
}
