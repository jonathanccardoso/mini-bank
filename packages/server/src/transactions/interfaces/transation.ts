import { TypeStatusEnum } from './statusEnumTransaction';

export interface ITransaction {
  id: string;
  accountPayerId: string;
  accountPayeeId: string;
  amount: number;
  date: string;
  reason: string;
  status: TypeStatusEnum;
}
