import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from '../../users/entities/user.entity';
import { TypeAccountEnum } from '../interfaces';

@Table({
  tableName: 'accounts',
})
export class Account extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_id', allowNull: false, type: DataType.STRING })
  userId: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  balance: number;

  @Column({ allowNull: false, type: DataType.STRING })
  bank: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  agency: number;

  @Column({ allowNull: false, type: DataType.FLOAT })
  account: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(TypeAccountEnum)),
  })
  type: TypeAccountEnum;
}
