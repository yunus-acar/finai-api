import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async createUser(dto: CreateUserDto) {
    dto.password = await hash(dto.password, 10);

    return this.repository.createUser(dto);
  }

  async validateUsernamePassword(username: string, pass: string) {
    const user = await this.repository.getUserByUsername(username);

    if (!user) throw new UnauthorizedException('Invalid username or password');

    const match = await compare(pass, user.password);
    if (!match) throw new UnauthorizedException('Invalid username or password');

    return user;
  }

  async getUsers(
    limit: number,
    offset: number,
  ): Promise<{ users: UserEntity[]; count: number }> {
    return this.repository.getUsers(limit, offset);
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.repository.getUserById(id);
  }

  async getUserByUsername(username: string) {
    return await this.repository.getUserByUsername(username);
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await hash(dto.password, 10);
    }

    return this.repository.updateUser(userId, dto);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.repository.deleteUser(id);
  }
}
