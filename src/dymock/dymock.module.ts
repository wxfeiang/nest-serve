import { Module } from '@nestjs/common';
import { DymockService } from './dymock.service';
import { DymockController } from './dymock.controller';

@Module({
  controllers: [DymockController],
  providers: [DymockService],
})
export class DymockModule {}
