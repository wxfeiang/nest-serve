import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serveresource } from './entities/serveresource.entity';
import { ServeresourceController } from './serveresource.controller';
import { ServeresourceService } from './serveresource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Serveresource])],
  controllers: [ServeresourceController],
  providers: [ServeresourceService],
})
export class ServeresourceModule {}
