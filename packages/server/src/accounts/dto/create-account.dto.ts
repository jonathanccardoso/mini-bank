import { IsNotEmpty, IsNumber } from 'class-validator';
import { TypeAccountEnum } from '../interfaces';

export class CreateAccountDto {
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsNotEmpty()
  bank: string;

  @IsNumber()
  @IsNotEmpty()
  agency: number;

  @IsNumber()
  @IsNotEmpty()
  account: number;

  @IsNotEmpty()
  type: TypeAccountEnum;
}
