import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Account } from '../../accounts/entities/account.entity';
import { TypeStatusEnum } from '../interfaces';

@Table({
  tableName: 'transactions',
})
export class Transaction extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @ForeignKey(() => Account)
  @Column({
    field: 'account_payer_Id',
    allowNull: false,
    type: DataType.STRING,
  })
  accountPayerId: string;

  @ForeignKey(() => Account)
  @Column({
    field: 'account_payee_Id',
    allowNull: false,
    type: DataType.STRING,
  })
  accountPayeeId: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  amount: number;

  @Column({ allowNull: false, type: DataType.STRING })
  date: string;

  @Column({ allowNull: false, type: DataType.STRING })
  reason: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(TypeStatusEnum)),
  })
  status: TypeStatusEnum;
}
