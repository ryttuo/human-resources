import { IsString, IsDate, IsOptional, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsDate()
  @Type(() => Date)
  hire_date: Date;

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  department_id: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateEmployeeDto {
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  department_id?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
