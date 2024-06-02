
import { IntersectionType } from '@nestjs/swagger';
import { pageListEntity } from 'src/common/database/pageListEntity';
import { Dict } from '../entities/dict.entity';
export class QueryDict extends IntersectionType(Dict, pageListEntity) { }
