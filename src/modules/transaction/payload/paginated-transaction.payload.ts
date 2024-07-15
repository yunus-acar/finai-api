import { ObjectType } from '@nestjs/graphql';
import Paginated from '../../../shared/pagination/pagination';
import { TransactionPayload } from './transaction.payload';

@ObjectType()
export class PaginatedTransactionPayload extends Paginated(
  TransactionPayload,
) {}
