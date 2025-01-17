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

import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DepartmentModule } from './department/department.module';
import { DictModule } from './dict/dict.module';
import { DymockModule } from './dymock/dymock.module';
import { EmailModule } from './email/email.module';
import { IndividualtaxesModule } from './individualtaxes/individualtaxes.module';
import { MenuModule } from './menu/menu.module';
import { MyresourcesModule } from './myresources/myresources.module';
import { RoleModule } from './role/role.module';
import { ServeresourceModule } from './serveresource/serveresource.module';
import { DataServeModule } from './data-serve/data-serve.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,  // 不忽略环境变量文件
      load: [getConfig],
    }),
    // 任务调度
    ScheduleModule.forRoot(),
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
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    EmployeeModule,
    AuthModule,
    BaseModule,
    OrganizationModule,
    DepartmentModule,
    RoleModule,
    MyresourcesModule,
    DictModule,
    MenuModule,
    IndividualtaxesModule,
    EmailModule,
    ServeresourceModule,
    DymockModule,
    DataServeModule,
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
    {
      provide: APP_GUARD, // 限流所有接口
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
