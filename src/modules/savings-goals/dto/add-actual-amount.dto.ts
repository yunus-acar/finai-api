import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddActualAmountDto {
  @Field(() => Number)
  @IsNotEmpty()
  id: number;

  @Field(() => Number)
  @IsNotEmpty()
  amount: number;

  @Field(() => Number, { nullable: true })
  userId: number;
}
