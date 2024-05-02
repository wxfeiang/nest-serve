import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PageList } from 'src/types';

export const pageInfo = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const pageInfo: PageList = request.body

        if (!pageInfo.currentPage || pageInfo.currentPage < 1) {
            pageInfo.currentPage = 1
        }
        if (!pageInfo.pageSize || pageInfo.pageSize < 1) {
            pageInfo.pageSize = 500
        }
        return pageInfo
    },
);