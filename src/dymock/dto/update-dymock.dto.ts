import { PartialType } from '@nestjs/swagger';
import { CreateDymockDto } from './create-dymock.dto';

export class UpdateDymockDto extends PartialType(CreateDymockDto) {}
