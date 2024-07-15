import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenPayload } from './payload/token.payload';
import { LoginDto } from './dto/login.dto';
import { UserPayload } from '../users/payload/user.payload';
import { RegisterDto } from './dto/register.dto';
import { AuthPayload } from './payload/auth.payload';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('data') data: LoginDto): Promise<TokenPayload> {
    return this.authService.login(data);
  }

  @Mutation(() => UserPayload)
  async register(@Args('data') data: RegisterDto): Promise<UserPayload> {
    return this.authService.register(data);
  }

  @Mutation(() => TokenPayload)
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<TokenPayload> {
    return this.authService.refreshToken(refreshToken);
  }

  @ResolveField('user', () => UserPayload)
  async user(@Parent() auth: AuthPayload) {
    return this.authService.getUserFromToken(auth.accessToken);
  }
}
