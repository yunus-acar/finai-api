import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBudgetDto {
  @Field()
  @IsNotEmpty()
  category: string;

  @Field(() => Number)
  amount: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Number, { nullable: true })
  userId: number;
}
