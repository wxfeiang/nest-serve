import { PartialType } from '@nestjs/swagger';
import { CreateServeresourceDto } from './create-serveresource.dto';

export class UpdateServeresourceDto extends PartialType(
  CreateServeresourceDto,
) {}
