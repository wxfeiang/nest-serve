import { PartialType } from '@nestjs/swagger';
import { CreateDataServeDto } from './create-data-serve.dto';

export class UpdateDataServeDto extends PartialType(CreateDataServeDto) {}
