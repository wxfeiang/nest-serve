import { Module } from '@nestjs/common';
import { DataServeService } from './data-serve.service';
import { DataServeController } from './data-serve.controller';

@Module({
  controllers: [DataServeController],
  providers: [DataServeService],
})
export class DataServeModule {}
