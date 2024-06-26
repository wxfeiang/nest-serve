import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import helmet from 'helmet';
import { logger } from './common/middleware/logger.middleware';
import { generateDocmment } from './common/utils/doc';
import { getConfig } from './common/utils/ymlConfig';

declare const module: any;

async function bootstrap() {
  // 开启事物  //TODO: 后期会处理
  initializeTransactionalContext();

  //为了文件上传
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // api多版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [getConfig('VERSION').index],
  });
  generateDocmment(app);
  // 开启静态文件预览
  app.useStaticAssets('public', {
    // join(__dirname, '../../', 'public')
    prefix: `/v${getConfig('VERSION').index}/public/`, // 配和多版本
  });
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 跨域
  app.enableCors();

  // 使用session
  app.use(
    session({
      secret: getConfig('SESSION').secret,
      resave: false,
      saveUninitialized: false,
      rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false),
      cookie: { maxAge: getConfig('SESSION').maxAge }, //设置 session 的有效时间，单位毫秒
    }),
  );
  //防止跨站脚本攻击
  app.use(helmet());

  // 启动项目
  await app.listen(getConfig('HTTP').port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
