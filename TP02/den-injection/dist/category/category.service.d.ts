export declare class CategoryService {
    private categories;
    private nextId;
    findAll(): {
        id: number;
        name: string;
    }[];
    findOne(id: number): {
        id: number;
        name: string;
    };
    create(payload: {
        name: string;
    }): {
        id: number;
        name: string;
    };
}
