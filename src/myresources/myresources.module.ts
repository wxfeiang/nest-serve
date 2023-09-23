import { Module } from '@nestjs/common';
import { MyresourcesService } from './myresources.service';
import { MyresourcesController } from './myresources.controller';

@Module({
  controllers: [MyresourcesController],
  providers: [MyresourcesService],
})
export class MyresourcesModule {}
