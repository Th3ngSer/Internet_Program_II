export declare class ProductService {
    private products;
    private nextId;
    findAll(): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    }[];
    findByCategoryId(categoryId: number): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    }[];
    findOne(id: number): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    };
    create(payload: {
        name: string;
        price: number;
        categoryId: number;
    }): {
        id: number;
        name: string;
        price: number;
        categoryId: number;
    };
}
