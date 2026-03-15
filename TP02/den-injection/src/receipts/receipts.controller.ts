import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { CreateReceiptDto } from './dto/create-receipts.dto';
import { UpdateReceiptDto } from './dto/update-receipts.dto';
import { ReceiptsService } from './receipts.service';

@UseGuards(ApiKeyGuard)
@Controller('receipts')
export class ReceiptsController {
    constructor(private readonly receiptsService: ReceiptsService) {}

    @Get()
    findAll() {
        return this.receiptsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.receiptsService.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateReceiptDto) {
        return this.receiptsService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
        return this.receiptsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.receiptsService.remove(id);
    }
}
