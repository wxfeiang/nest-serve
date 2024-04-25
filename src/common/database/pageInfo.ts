/**
 * 分页数据封装
 */
export class BasePage<T> {
  constructor(
    private currentPage: number,
    private pageSize: number,
    private total: number,
    private list: T[],
  ) { }
}
