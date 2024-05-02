
import { IntersectionType } from '@nestjs/swagger';
import { pageListEntity } from 'src/common/database/pageListEntity';
import { Role } from '../entities/role.entity';
export class QueryRole extends IntersectionType(Role, pageListEntity) { }
