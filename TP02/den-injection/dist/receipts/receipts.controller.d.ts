import { CreateReceiptDto } from './dto/create-receipts.dto';
import { UpdateReceiptDto } from './dto/update-receipts.dto';
import { ReceiptsService } from './receipts.service.js';
export declare class ReceiptsController {
    private readonly receiptsService;
    constructor(receiptsService: ReceiptsService);
    findAll(): Promise<import("./entities/receipt.entity").Receipt[]>;
    findOne(id: string): Promise<import("./entities/receipt.entity").Receipt>;
    create(dto: CreateReceiptDto): Promise<import("./entities/receipt.entity").Receipt>;
    update(id: string, dto: UpdateReceiptDto): Promise<import("./entities/receipt.entity").Receipt>;
    remove(id: string): Promise<{
        deleted: boolean;
        receiptId: string;
    }>;
}
