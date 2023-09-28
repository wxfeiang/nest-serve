import { PartialType } from '@nestjs/swagger';
import { CreateMyresourceDto } from './create-myresource.dto';

export class UpdateMyresourceDto extends PartialType(CreateMyresourceDto) {}
