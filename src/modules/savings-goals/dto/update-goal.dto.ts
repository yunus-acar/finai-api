import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateGoalDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Number)
  targetAmount: number;

  @Field(() => Number)
  currentAmount: number;

  @Field(() => Date)
  targetDate: Date;

  @Field(() => Number, { nullable: true })
  userId: number;
}
