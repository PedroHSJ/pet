import { Sort } from 'src/utils/sort.type';

export interface ApiResponseInterface<T> {
    items: T[];
    totalCount: number;
    skip?: number;
    take?: number;
    sort?: Sort;
}
