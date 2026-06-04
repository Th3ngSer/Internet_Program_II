"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
let ProductService = class ProductService {
    products = [];
    nextId = 1;
    findAll() {
        return this.products;
    }
    findByCategoryId(categoryId) {
        return this.products.filter((item) => item.categoryId === categoryId);
    }
    findOne(id) {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    create(payload) {
        const product = {
            id: this.nextId++,
            name: payload.name,
            price: payload.price,
            categoryId: payload.categoryId,
        };
        this.products.push(product);
        return product;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
//# sourceMappingURL=product.service.js.map