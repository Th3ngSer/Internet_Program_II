import { CategoryService } from '../../category/category.service';
export declare class CategoryResolver {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    categories(): {
        id: number;
        name: string;
    }[];
    createCategory(name: string): {
        id: number;
        name: string;
    };
}
