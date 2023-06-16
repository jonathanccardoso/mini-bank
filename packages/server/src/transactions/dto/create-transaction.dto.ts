import { IsNotEmpty, IsNumber } from 'class-validator';
import { TypeStatusEnum } from '../interfaces';

export class CreateTransactionDto {
  @IsNotEmpty()
  accountPayerId: string;

  @IsNotEmpty()
  accountPayeeId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  status: TypeStatusEnum;
}
