import { Sort } from 'src/utils/sort.type';

export interface ApiResponseInterface<T> {
    items: T[];
    totalCount: number;
    page?: number;
    pageSize?: number;
    order?: Sort;
}
