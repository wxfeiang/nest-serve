import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualTaxes } from './entities/individualtax.entity';
import { IndividualtaxesController } from './individualtaxes.controller';
import { IndividualtaxesService } from './individualtaxes.service';

@Module({
  imports: [TypeOrmModule.forFeature([IndividualTaxes])],
  controllers: [IndividualtaxesController],
  providers: [IndividualtaxesService],
})
export class IndividualtaxesModule {}
