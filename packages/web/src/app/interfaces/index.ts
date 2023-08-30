export enum TypeStatusEnum {
  Accepted = 'Accepted',
  InProgress = 'In progress',
  Declined = 'Declined',
}

export interface ITransaction {
  id: string;
  accountPayerId: string;
  accountPayeeId: string;
  amount: number;
  date: string;
  reason: string;
  status: TypeStatusEnum;
}
