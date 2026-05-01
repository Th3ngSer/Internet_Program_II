import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDERS_SERVICE') private client: ClientProxy,
        private readonly notifications: NotificationsService,
    ) { }

    private readonly orders: Array<{
        orderId: string;
        itemName: string;
        quantity: number;
        price: number;
        customerName?: string;
        createdAt: Date;
    }> = [];


    createOrder(orderDto: any) {
        this.client.emit('order_created', { order: orderDto, createdAt: new Date().toISOString() });

        this.notifications.notify('order_created', {
            order: orderDto,
        });

        return { status: 'Order accepted', order: orderDto };
    }

    create(dto: CreateOrderDto) {
        const order = {
            orderId: randomUUID(),
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
}