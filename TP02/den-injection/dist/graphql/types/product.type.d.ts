import { CategoryType } from './category.type';
export declare class ProductType {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    category?: CategoryType;
}
