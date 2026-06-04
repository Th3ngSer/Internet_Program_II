"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_service_1 = require("../../product/product.service");
const category_service_1 = require("../../category/category.service");
let ProductResolver = class ProductResolver {
    productService;
    categoryService;
    constructor(productService, categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }
    products() {
        return this.productService.findAll();
    }
    product(id) {
        return this.productService.findOne(Number(id));
    }
    productsByCategory(categoryId) {
        return this.productService.findByCategoryId(Number(categoryId));
    }
    createProduct(name, price, categoryId) {
        return this.productService.create({
            name,
            price,
            categoryId: Number(categoryId),
        });
    }
    category(product) {
        return this.categoryService.findOne(product.categoryId);
    }
};
exports.ProductResolver = ProductResolver;
__decorate([
    (0, graphql_1.Query)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "products", null);
__decorate([
    (0, graphql_1.Query)('product'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "product", null);
__decorate([
    (0, graphql_1.Query)('productsByCategory'),
    __param(0, (0, graphql_1.Args)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "productsByCategory", null);
__decorate([
    (0, graphql_1.Mutation)('createProduct'),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('price')),
    __param(2, (0, graphql_1.Args)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.ResolveField)('category'),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "category", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, graphql_1.Resolver)('Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        category_service_1.CategoryService])
], ProductResolver);
//# sourceMappingURL=product.resolver.js.map