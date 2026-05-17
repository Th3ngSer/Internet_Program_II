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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const notifications_service_1 = require("../notifications/notifications.service");
const client_proxy_1 = require("@nestjs/microservices/client/client-proxy");
let OrdersService = class OrdersService {
    client;
    notifications;
    constructor(client, notifications) {
        this.client = client;
        this.notifications = notifications;
    }
    orders = [];
    createOrder(orderDto) {
        this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });
        this.notifications.notify('order_created', {
            order: orderDto,
        });
        return { status: 'Order accepted', order: orderDto };
    }
    create(dto) {
        const order = {
            orderId: (0, crypto_1.randomUUID)(),
            itemName: dto.itemName,
            quantity: dto.quantity,
            price: dto.price,
            customerName: dto.customerName,
            createdAt: new Date(),
        };
        this.orders.push(order);
        this.client.emit('order_created', {
            order,
            createdAt: order.createdAt.toISOString(),
        });
        this.notifications.notify('order_created', {
            order,
        });
        return order;
    }
    findAll() {
        return this.orders;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ORDERS_SERVICE')),
    __metadata("design:paramtypes", [client_proxy_1.ClientProxy,
        notifications_service_1.NotificationsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map