import { ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { CustomException } from 'src/common/exceptions/custom.exception';
import { IS_PUBLIC_KEY } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 自定义认证逻辑
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  override handleRequest<TUser = any>(
    err: any,
    user: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status?: any,
  ): TUser {
    if (err || !user) {
      // 可以报出一个自定义异常
      throw CustomException.throwForbidden();
    }
    return user;
  }
}
