import { Body, Controller, Get, Logger, Post, UseGuards} from '@nestjs/common';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@UseGuards(ApiKeyGuard)
@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        this.logger.log(`Creating order: ${JSON.stringify(dto)}`);
        return this.ordersService.create(dto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();    
    };
}
