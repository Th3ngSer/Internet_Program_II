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
exports.ReceiptsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const receipt_entity_1 = require("./entities/receipt.entity");
const notifications_service_1 = require("../notifications/notifications.service");
let ReceiptsService = class ReceiptsService {
    receiptRepo;
    notifications;
    constructor(receiptRepo, notifications) {
        this.receiptRepo = receiptRepo;
        this.notifications = notifications;
    }
    async findAll() {
        return this.receiptRepo.find({ order: { issuedAt: 'DESC' } });
    }
    async findOne(receiptId) {
        const receipt = await this.receiptRepo.findOne({
            where: { receiptId },
        });
        if (!receipt)
            throw new common_1.NotFoundException('Receipt not found');
        return receipt;
    }
    async create(dto) {
        const receipt = this.receiptRepo.create({
            issuedAt: new Date(dto.issuedAt),
            name: dto.name,
            price: dto.price,
        });
        const saved = await this.receiptRepo.save(receipt);
        this.notifications.notify('receipt_created', {
            receiptId: saved.receiptId,
            price: saved.price
        });
        return saved;
    }
    async update(receiptId, dto) {
        const receipt = await this.findOne(receiptId);
        if (dto.issuedAt !== undefined) {
            receipt.issuedAt = new Date(dto.issuedAt);
        }
        if (dto.name !== undefined) {
            receipt.name = dto.name;
        }
        if (dto.price !== undefined) {
            receipt.price = dto.price;
        }
        return this.receiptRepo.save(receipt);
    }
    async remove(receiptId) {
        const receipt = await this.findOne(receiptId);
        await this.receiptRepo.remove(receipt);
        return { deleted: true, receiptId };
    }
};
exports.ReceiptsService = ReceiptsService;
exports.ReceiptsService = ReceiptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(receipt_entity_1.Receipt)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], ReceiptsService);
//# sourceMappingURL=receipts.service.js.map