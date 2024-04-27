
import { ApiProperty } from '@nestjs/swagger';
export class pageListEntity {
    @ApiProperty({
        description: 'currentPage 当前页',
        example: 1
    })
    currentPage: number;

    @ApiProperty({
        description: 'pageSize 当前页显示条数',
        example: 100
    })
    pageSize: number;
}