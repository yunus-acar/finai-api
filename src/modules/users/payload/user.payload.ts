import { Field, ObjectType } from '@nestjs/graphql';
import { BasePayload } from '../../../shared/graphql/base.payload';
import { Role } from '../enum/role.enum';

@ObjectType()
export class UserPayload extends BasePayload {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field(() => Role)
  role: Role;

  @Field()
  email: string;
}
