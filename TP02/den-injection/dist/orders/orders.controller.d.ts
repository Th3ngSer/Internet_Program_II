import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly logger;
    constructor(ordersService: OrdersService);
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
