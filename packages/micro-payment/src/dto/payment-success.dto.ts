import { IsNotEmpty, IsString } from 'class-validator';

export class TransactionSuccessDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
