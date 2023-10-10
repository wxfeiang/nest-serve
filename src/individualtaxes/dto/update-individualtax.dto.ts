import { PartialType } from '@nestjs/swagger';
import { CreateIndividualtaxDto } from './create-individualtax.dto';

export class UpdateIndividualtaxDto extends PartialType(
  CreateIndividualtaxDto,
) {}
