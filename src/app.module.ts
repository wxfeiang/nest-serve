// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseExceptionFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { getConfig } from './common/utils/ymlConfig';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          ...getConfig('MYSQL_CONFIG'),
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return new DataSource(options);
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
