import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    itemName: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    quantity: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsString()
    customerName?: string;
}
