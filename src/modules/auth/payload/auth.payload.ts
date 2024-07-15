import { ObjectType } from '@nestjs/graphql';
import { UserPayload } from '../../users/payload/user.payload';
import { TokenPayload } from './token.payload';

@ObjectType()
export class AuthPayload extends TokenPayload {
  user: UserPayload;
}
