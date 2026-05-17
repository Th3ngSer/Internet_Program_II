import { Repository } from 'typeorm';
import { CreateReceiptDto } from './dto/create-receipts.dto';
import { UpdateReceiptDto } from './dto/update-receipts.dto';
import { Receipt } from './entities/receipt.entity';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ReceiptsService {
    private readonly receiptRepo;
    private readonly notifications;
    constructor(receiptRepo: Repository<Receipt>, notifications: NotificationsService);
    findAll(): Promise<Receipt[]>;
    findOne(receiptId: string): Promise<Receipt>;
    create(dto: CreateReceiptDto): Promise<Receipt>;
    update(receiptId: string, dto: UpdateReceiptDto): Promise<Receipt>;
    remove(receiptId: string): Promise<{
        deleted: boolean;
        receiptId: string;
    }>;
}
