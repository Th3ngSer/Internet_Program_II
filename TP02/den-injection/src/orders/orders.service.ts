import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    private readonly orders: Array<{
        orderId: string;
        itemName: string;
        quantity: number;
        price: number;
        customerName?: string;
        createdAt: Date;
    }> = [];

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
        return order;
    }
}
