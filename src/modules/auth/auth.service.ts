import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserPayload } from '../users/payload/user.payload';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { TokenPayload } from './payload/token.payload';

import { LoginDto } from './dto/login.dto';
import { Role } from '../users/enum/role.enum';
import { UserEntity } from '../users/user.entity';
import { AuthPayload } from './payload/auth.payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(data: RegisterDto): Promise<UserPayload> {
    return this.usersService.createUser({
      ...data,
      role: Role.User,
    });
  }

  async login({ username, password }: LoginDto): Promise<TokenPayload> {
    const user = await this.usersService.validateUsernamePassword(
      username,
      password,
    );

    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return this.generateTokens({
      sub: user.id,
    });
  }

  async validateUser(userId: number): Promise<UserEntity> {
    const user = await this.usersService.getUserById(userId);

    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return user;
  }

  private generateAccessToken(payload: { sub: number }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { sub: number }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshTokenSecret'),
      expiresIn: this.configService.get('jwt.refreshTokenExpirationTime'),
    });
  }

  generateTokens(payload: { sub: number }): TokenPayload {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  refreshToken(token: string): TokenPayload {
    try {
      const { sub } = this.jwtService.verify(token, {
        secret: this.configService.get('jwt.refreshTokenSecret'),
      });

      return this.generateTokens({
        sub,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  getUserFromToken(token: string): Promise<UserPayload> {
    const id = this.jwtService.verify(token).sub;

    return this.usersService.getUserById(id);
  }
}
