import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { RolesGuard } from './roles.guard';
import { USER_ROLE } from 'src/user/enum/user.enumm';
import { GraphqlAuthGuard } from './graphql-auth.guard';

export const ROLES_KEY = 'roles';

export function Roles(...roles: USER_ROLE[]) {
  return applyDecorators(
    UseGuards(GraphqlAuthGuard, RolesGuard),
    SetMetadata(ROLES_KEY, roles),
  );
}
