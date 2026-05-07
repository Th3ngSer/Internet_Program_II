import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products: Array<{
        id: number;
        name: string;
        price: number;
        categoryId: number;
    }> = [];
    private nextId = 1;

    findAll() {
        return this.products;
    }
// Mini Challenge: Implement a method to find products by category ID
    findByCategoryId(categoryId: number) {
        return this.products.filter((item) => item.categoryId === categoryId);
    }

    findOne(id: number) {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    create(payload: { name: string; price: number; categoryId: number }) {
        const product = {
            id: this.nextId++,
            name: payload.name,
            price: payload.price,
            categoryId: payload.categoryId,
        };

        this.products.push(product);
        return product;
    }
}
