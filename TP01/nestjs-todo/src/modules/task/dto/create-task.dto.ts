import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class createTaskDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsInt()
	@Min(1)
	userId?: number;
}
