import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { BadRequestException, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLErrorFilter } from '@common/filters/custom-exception.filter';
import { RESPONSE_MESSAGE } from '@common/constants/response.message';

import { LoginResponse } from './types/login-response.type';
import { RegisterDto } from './dtos/register.dto';
import { RegisterResponse } from './types/register-response.type';
import { LoginDto } from './dtos/login.dto';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword:
          RESPONSE_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_ARE_NOT_THE_SAME,
      });
    }
    const { user } = await this.authService.register(registerDto, context.res);
    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }
  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
