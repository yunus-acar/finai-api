import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPayload } from './payload/user.payload';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { RolesGuard } from '../../shared/guards/role.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from './enum/role.enum';
import { UsersPayload } from './payload/users.payload';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { UserEntity } from './user.entity';

@Resolver(() => UserPayload)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Query(() => UserPayload)
  async getUser(@Args('id') id: number): Promise<UserPayload> {
    return this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Query(() => UsersPayload)
  async getUsers(@Args('limit') limit: number, @Args('offset') offset: number) {
    return this.usersService.getUsers(limit, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Mutation(() => UserPayload)
  async createUser(@Args('data') data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserPayload)
  async updateUser(
    @CurrentUser() user: UserEntity,
    @Args('data') data: UpdateUserDto,
  ) {
    return this.usersService.updateUser(user.id, data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@CurrentUser() user: UserEntity) {
    return this.usersService.deleteUser(user.id);
  }
}
