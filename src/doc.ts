import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { knife4jSetup } from 'nestjs-knife4j';
// 文档
export const generateDocmment = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('nestjs-服务开发')
    .setDescription('nestjs 开发的接口服务')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  knife4jSetup(app, {
    urls: [
      {
        name: '1.0版本',
        url: `/api-json`,
        swaggerVersion: '3.0',
        location: `/api-json`,
      },
    ],
  });
};
