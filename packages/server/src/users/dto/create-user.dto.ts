import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TypeEnum } from '../interfaces';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  // FIXME: Add custom validator IsUnique()
  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  // FIXME: Add custom validator IsUnique()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: TypeEnum;
}
