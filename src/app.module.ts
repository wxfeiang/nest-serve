import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { BaseModule } from './base/base.module';
import { BaseExceptionFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { getConfig } from './common/utils/ymlConfig';
import { EmployeeModule } from './employee/employee.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';

import { DepartmentModule } from './department/department.module';
import { RoleModule } from './role/role.module';
console.log('🥨', RoleModule);
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig],
    }),
    //数据库
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          ...getConfig('MYSQL_CONFIG'),
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    EmployeeModule,
    AuthModule,
    BaseModule,
    OrganizationModule,
    DepartmentModule,
    RoleModule,
  ],
  // controllers: [AppController],
  controllers: [],
  providers: [
    AppService,
    {
      // 管道 - 验证
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          // whitelist: true, // 自动删除非白名单属性(在验证类中没有任何修饰符的属性)这个选项可以抛出异常并告诉我们哪个属性是多余的。
          transform: true, // 属性转换
        });
      },
    },
    {
      // 守卫 jwt认证
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      // 序列化器 - 转换和净化数据
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },

    {
      // 全局拦截器
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
    {
      // Http异常
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
