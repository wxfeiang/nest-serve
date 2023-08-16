import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from './common/utils/ymlConfig';
import { generateDocmment } from './doc';

import { logger } from './common/middleware/logger.middleware';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // api多版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });
  generateDocmment(app);

  // 监听所有的请求路由，并打印日志
  app.use(logger);

  // 启动项目
  await app.listen(getConfig('HTTP').port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
