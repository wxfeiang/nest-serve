import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { pageListEntity } from 'src/common/database/pageListEntity';
import { CreateServeresourceDto } from './create-serveresource.dto';

export class QueryServeresourceDto extends PartialType(OmitType(IntersectionType(CreateServeresourceDto, pageListEntity), [
    'url'])) {

}
