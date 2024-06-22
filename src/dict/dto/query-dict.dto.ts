
import { IntersectionType, OmitType } from '@nestjs/swagger';
import { pageListEntity } from 'src/common/database/pageListEntity';
import { Dict } from '../entities/dict.entity';
export class QueryDict extends OmitType(IntersectionType(Dict, pageListEntity), [
    'id', 'describe',]) { }
