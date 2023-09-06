/*
 * @Author: wxfeiang wxfeiang@qq.com
 * @Description:  守卫拦截
 * @Date: 2023-09-06 22:26:45
 * @LastEditors: wxfeiang wxfeiang@qq.com
 * @LastEditTime: 2023-09-06 22:27:02
 * @FilePath: /nest-serve/src/auth/guard/local-auth.guard.ts
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
