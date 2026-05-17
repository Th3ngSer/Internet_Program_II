import { CreateOrderDto } from './dto/create-order.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
export declare class OrdersService {
    private client;
    private readonly notifications;
    constructor(client: ClientProxy, notifications: NotificationsService);
    private readonly orders;
    createOrder(orderDto: any): {
        status: string;
        order: any;
    };
    create(dto: CreateOrderDto): {
        orderId: `${string}-${string}-${string}-${string}-${string}`;
        itemName: string;
        quantity: number;
        price: number;
        customerName: string | undefined;
        createdAt: Date;
    };
    findAll(): {
        orderId: string;
        itemName: string;
        quantity: number;
        price: number;
        customerName?: string;
        createdAt: Date;
    }[];
}
