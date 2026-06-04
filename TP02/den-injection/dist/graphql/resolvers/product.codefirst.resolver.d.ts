import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';
export declare class ProductCodeFirstResolver {
    private readonly productService;
    private readonly categoryService;
    constructor(productService: ProductService, categoryService: CategoryService);
    products(): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    }[];
    product(id: number): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    };
    productsByCategory(categoryId: number): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    }[];
    createProduct(input: CreateProductInput): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    };
    category(product: ProductType): {
        id: number;
        name: string;
    };
}
