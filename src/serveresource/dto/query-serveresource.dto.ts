import { IntersectionType, OmitType } from '@nestjs/swagger';
import { pageListEntity } from 'src/common/database/pageListEntity';
import { CreateServeresourceDto } from './create-serveresource.dto';

export class QueryServeresourceDto extends OmitType(IntersectionType(CreateServeresourceDto, pageListEntity), [
    'url']) {

}
