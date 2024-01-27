import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RESPONSE_MESSAGE } from '@common/constants/response.message';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = context.getArgByIndex(2);
    const request: Request = gqlCtx.req;
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGE.NO_TOKEN_FOUND_IN_COOKIES,
      );
    }

    try {
      const payload = await this.verifyToken(token);
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException(RESPONSE_MESSAGE.INVALID_TOKEN);
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.access_token;
  }

  private async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }
}
