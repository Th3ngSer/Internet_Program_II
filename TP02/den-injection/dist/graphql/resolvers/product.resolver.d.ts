import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';
export declare class ProductResolver {
    private readonly productService;
    private readonly categoryService;
    constructor(productService: ProductService, categoryService: CategoryService);
    products(): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    }[];
    product(id: string): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    };
    productsByCategory(categoryId: string): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    }[];
    createProduct(name: string, price: number, categoryId: string): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    };
    category(product: any): {
        id: number;
        name: string;
    };
}
