import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @MaxLength(200)
  username: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;
}
