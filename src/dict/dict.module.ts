import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictController } from './dict.controller';
import { DictService } from './dict.service';
import { Dict } from './entities/dict.entity';
import { DictType } from './entities/dictType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dict, DictType])],
  controllers: [DictController],
  providers: [DictService],
})
export class DictModule {}
