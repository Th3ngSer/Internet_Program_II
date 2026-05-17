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
exports.ReceiptsController = void 0;
const common_1 = require("@nestjs/common");
const api_key_guard_1 = require("../common/guards/api-key.guard");
const create_receipts_dto_1 = require("./dto/create-receipts.dto");
const update_receipts_dto_1 = require("./dto/update-receipts.dto");
const receipts_service_js_1 = require("./receipts.service.js");
let ReceiptsController = class ReceiptsController {
    receiptsService;
    constructor(receiptsService) {
        this.receiptsService = receiptsService;
    }
    findAll() {
        return this.receiptsService.findAll();
    }
    findOne(id) {
        return this.receiptsService.findOne(id);
    }
    create(dto) {
        return this.receiptsService.create(dto);
    }
    update(id, dto) {
        return this.receiptsService.update(id, dto);
    }
    remove(id) {
        return this.receiptsService.remove(id);
    }
};
exports.ReceiptsController = ReceiptsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_receipts_dto_1.CreateReceiptDto]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_receipts_dto_1.UpdateReceiptDto]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "remove", null);
exports.ReceiptsController = ReceiptsController = __decorate([
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Controller)('receipts'),
    __metadata("design:paramtypes", [receipts_service_js_1.ReceiptsService])
], ReceiptsController);
//# sourceMappingURL=receipts.controller.js.map