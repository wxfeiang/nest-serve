import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { knife4jSetup } from 'nestjs-knife4j';
import { getConfig } from './ymlConfig';

// 文档
export const generateDocmment = (app: INestApplication) => {
  const vesion = 'v' + getConfig('VERSION').index;
  const config = new DocumentBuilder()
    .setTitle('nestjs-服务开发')
    .setDescription('nestjs 开发的接口服务')
    .addBearerAuth()
    .setTermsOfService(vesion)
    .setVersion(vesion + '.0')
    .setBasePath(vesion)
    .setExternalDoc('接口json 地址', `/${vesion}/api-json`) //swagger文件 api 默认显示后面地址
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(vesion + '/api', app, document);
  // doc.html
  knife4jSetup(app, {
    urls: [
      {
        name: vesion + '.0 版本',
        url: `/${vesion}/api-json`,
        swaggerVersion: vesion + '.0',
        location: `/${vesion}/api-json`,
      },
    ],
  });
};
