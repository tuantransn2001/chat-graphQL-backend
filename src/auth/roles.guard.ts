import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { USER_ROLE } from 'src/user/enum/user.enumm';
import { UserService } from 'src/user/user.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;
    const user = context.switchToHttp().getRequest().user;

    if (!user) return false;

    const userFromDb = await this.userService.getUser(user.id);

    const currentRole = userFromDb.userRole[0].role
      .roleName as unknown as USER_ROLE;

    context.switchToHttp().getRequest().user = userFromDb;

    // pass all if user is ADMIN
    if (currentRole === USER_ROLE.ADMIN) {
      context.switchToHttp().getRequest().user.isAdmin = true;
      return true;
    }

    context.switchToHttp().getRequest().user.isAdmin = false;
    const isAllowedRole = (role: USER_ROLE) => role === currentRole;
    return requiredRoles.some(isAllowedRole);
  }
}
