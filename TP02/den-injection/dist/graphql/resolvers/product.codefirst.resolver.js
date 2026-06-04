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
exports.ProductCodeFirstResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_type_1 = require("../types/product.type");
const create_product_input_1 = require("../inputs/create-product.input");
const product_service_1 = require("../../product/product.service");
const category_service_1 = require("../../category/category.service");
const category_type_1 = require("../types/category.type");
let ProductCodeFirstResolver = class ProductCodeFirstResolver {
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
        return this.productService.findOne(id);
    }
    productsByCategory(categoryId) {
        return this.productService.findByCategoryId(categoryId);
    }
    createProduct(input) {
        return this.productService.create(input);
    }
    category(product) {
        return this.categoryService.findOne(product.categoryId);
    }
};
exports.ProductCodeFirstResolver = ProductCodeFirstResolver;
__decorate([
    (0, graphql_1.Query)(() => [product_type_1.ProductType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductCodeFirstResolver.prototype, "products", null);
__decorate([
    (0, graphql_1.Query)(() => product_type_1.ProductType, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductCodeFirstResolver.prototype, "product", null);
__decorate([
    (0, graphql_1.Query)(() => [product_type_1.ProductType]),
    __param(0, (0, graphql_1.Args)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductCodeFirstResolver.prototype, "productsByCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_type_1.ProductType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_input_1.CreateProductInput]),
    __metadata("design:returntype", void 0)
], ProductCodeFirstResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.ResolveField)(() => category_type_1.CategoryType, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_type_1.ProductType]),
    __metadata("design:returntype", void 0)
], ProductCodeFirstResolver.prototype, "category", null);
exports.ProductCodeFirstResolver = ProductCodeFirstResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_type_1.ProductType),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        category_service_1.CategoryService])
], ProductCodeFirstResolver);
//# sourceMappingURL=product.codefirst.resolver.js.map